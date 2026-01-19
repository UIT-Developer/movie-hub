#!/bin/bash
# ===========================================
# MOVIEHUB MANUAL DEPLOYMENT SCRIPT
# Deploy to Azure Container Apps
# ===========================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
ENVIRONMENT="${ENVIRONMENT:-staging}"
DEPLOY_INFRA="${DEPLOY_INFRA:-true}"
SERVICES="${SERVICES:-all}"
REBUILD="${REBUILD:-true}"

# Resolve project root and tfvars even when called from other cwd
SCRIPT_DIR="$(cd -- "$(dirname "$0")" >/dev/null 2>&1 && pwd)"
PROJECT_ROOT="$(cd -- "${SCRIPT_DIR}/.." >/dev/null 2>&1 && pwd)"
DEFAULT_TFVARS_PATH="${PROJECT_ROOT}/infra/terraform/terraform.tfvars"
TFVARS_PATH="${TFVARS_PATH:-$DEFAULT_TFVARS_PATH}"
# Print colored message
print_msg() {
    local color=$1
    local msg=$2
    echo -e "${color}${msg}${NC}"
}

# Print section header
print_header() {
    echo ""
    print_msg "$BLUE" "============================================"
    print_msg "$BLUE" "$1"
    print_msg "$BLUE" "============================================"
}

# Read a database url from terraform.tfvars (database_urls map)
get_db_url() {
    local key=$1
    awk -F'"' -v k="$key" '$1 ~ k {print $2}' "$TFVARS_PATH"
}

# Check required tools
check_prerequisites() {
    print_header "Checking Prerequisites"
    
    local missing_tools=()
    
    command -v az >/dev/null 2>&1 || missing_tools+=("azure-cli")
    command -v terraform >/dev/null 2>&1 || missing_tools+=("terraform")
    command -v docker >/dev/null 2>&1 || missing_tools+=("docker")
    command -v node >/dev/null 2>&1 || missing_tools+=("node")
    
    if [ ${#missing_tools[@]} -ne 0 ]; then
        print_msg "$RED" "Missing required tools: ${missing_tools[*]}"
        exit 1
    fi
    
    print_msg "$GREEN" "✓ All prerequisites met"
}

# Load environment variables
load_env() {
    print_header "Loading Environment Configuration"

    if [ -f "$TFVARS_PATH" ]; then
        print_msg "$GREEN" "✓ Found terraform.tfvars at $TFVARS_PATH"
    else
        print_msg "$RED" "✗ terraform.tfvars not found"
        print_msg "$YELLOW" "Please copy terraform.tfvars.example to terraform.tfvars and fill in your values"
        exit 1
    fi
    
    # Extract values from tfvars (basic parsing)
    if [ -z "$ACR_NAME" ]; then
        ACR_NAME=$(grep -E "^acr_name" "$TFVARS_PATH" | cut -d'"' -f2)
        ACR_NAME="${ACR_NAME}${ENVIRONMENT}"
    fi
    
    if [ -z "$RESOURCE_GROUP" ]; then
        RESOURCE_GROUP=$(grep -E "^resource_group_name" "$TFVARS_PATH" | cut -d'"' -f2)
        RESOURCE_GROUP="${RESOURCE_GROUP}-${ENVIRONMENT}"
    fi
    
    ACR_LOGIN_SERVER="${ACR_NAME}.azurecr.io"
    
    USER_DATABASE_URL=${USER_DATABASE_URL:-$(get_db_url "user_service")}
    MOVIE_DATABASE_URL=${MOVIE_DATABASE_URL:-$(get_db_url "movie_service")}
    CINEMA_DATABASE_URL=${CINEMA_DATABASE_URL:-$(get_db_url "cinema_service")}
    BOOKING_DATABASE_URL=${BOOKING_DATABASE_URL:-$(get_db_url "booking_service")}

    export USER_DATABASE_URL MOVIE_DATABASE_URL CINEMA_DATABASE_URL BOOKING_DATABASE_URL

    if [ -z "$USER_DATABASE_URL" ] || [ -z "$MOVIE_DATABASE_URL" ] || [ -z "$CINEMA_DATABASE_URL" ] || [ -z "$BOOKING_DATABASE_URL" ]; then
        print_msg "$YELLOW" "⚠️  Missing one or more database_urls entries in terraform.tfvars; migrations will need manual DATABASE_URL values."
    else
        print_msg "$GREEN" "✓ Loaded database URLs from terraform.tfvars"
    fi

    print_msg "$GREEN" "Environment: $ENVIRONMENT"
    print_msg "$GREEN" "ACR Name: $ACR_NAME"
    print_msg "$GREEN" "Resource Group: $RESOURCE_GROUP"
}

# Azure login
azure_login() {
    print_header "Azure Authentication"
    
    # Check if already logged in
    if az account show >/dev/null 2>&1; then
        CURRENT_SUB=$(az account show --query "name" -o tsv)
        print_msg "$GREEN" "✓ Already logged in to Azure"
        print_msg "$GREEN" "  Subscription: $CURRENT_SUB"
    else
        print_msg "$YELLOW" "Logging in to Azure..."
        az login
    fi
    
    # Login to ACR
    print_msg "$YELLOW" "Logging in to ACR: $ACR_NAME..."
    az acr login --name "$ACR_NAME" || {
        print_msg "$RED" "Failed to login to ACR. ACR might not exist yet."
        print_msg "$YELLOW" "Run with DEPLOY_INFRA=true to create infrastructure first."
    }
}

# Deploy infrastructure
deploy_infrastructure() {
    print_header "Deploying Infrastructure with Terraform"
    
    cd infra/terraform
    
    print_msg "$YELLOW" "Initializing Terraform..."
    terraform init
    
    print_msg "$YELLOW" "Planning deployment..."
    terraform plan -out=tfplan
    
    print_msg "$YELLOW" "Applying deployment..."
    terraform apply tfplan
    
    print_msg "$YELLOW" "Getting outputs..."
    terraform output
    
    cd ../..
    
    print_msg "$GREEN" "✓ Infrastructure deployed successfully"
}

# Build and push Docker images
build_push_images() {
    print_header "Building and Pushing Docker Images"
    
    local services_to_build=()
    
    if [ "$SERVICES" == "all" ]; then
        services_to_build=("api-gateway" "user-service" "movie-service" "cinema-service" "booking-service" "web")
    else
        IFS=',' read -ra services_to_build <<< "$SERVICES"
    fi
    
    for service in "${services_to_build[@]}"; do
        service=$(echo "$service" | xargs)  # Trim whitespace
        print_msg "$YELLOW" "Building $service..."
        
        # Special handling for web service - pass build args
        if [ "$service" == "web" ]; then
            # Get API Gateway FQDN from Azure (if exists) or use from tfvars
            API_GATEWAY_FQDN=$(az containerapp show \
                --name api-gateway \
                --resource-group "$RESOURCE_GROUP" \
                --query "properties.configuration.ingress.fqdn" -o tsv 2>/dev/null || echo "")
            
            if [ -z "$API_GATEWAY_FQDN" ]; then
                # Fallback to reading from terraform.tfvars web_env
                API_GATEWAY_URL=$(grep -A 10 "web_env" "$TFVARS_PATH" | grep "NEXT_PUBLIC_API_BASE_URL" | cut -d'"' -f2 | head -1)
                API_GATEWAY_FQDN=$(echo "$API_GATEWAY_URL" | sed 's|https://||' | sed 's|http://||')
            fi
            
            CLERK_PUB_KEY=$(grep -E "^clerk_publishable_key" "$TFVARS_PATH" | cut -d'"' -f2)
            
            docker build \
                --build-arg NEXT_PUBLIC_API_URL="https://${API_GATEWAY_FQDN}/api/v1" \
                --build-arg NEXT_PUBLIC_BACKEND_API_URL="https://${API_GATEWAY_FQDN}/api/v1" \
                --build-arg NEXT_PUBLIC_WEBSOCKET_URL="wss://${API_GATEWAY_FQDN}" \
                --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="$CLERK_PUB_KEY" \
                --build-arg NEXT_PUBLIC_CLERK_SIGN_IN_URL="/login" \
                --build-arg NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/" \
                --build-arg NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up" \
                --build-arg NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL="/login" \
                --build-arg NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/" \
                -t "$ACR_LOGIN_SERVER/$service:latest" \
                -t "$ACR_LOGIN_SERVER/$service:$(git rev-parse --short HEAD)" \
                -f "apps/$service/Dockerfile" \
                --target production \
                .
        else
            docker build \
                -t "$ACR_LOGIN_SERVER/$service:latest" \
                -t "$ACR_LOGIN_SERVER/$service:$(git rev-parse --short HEAD)" \
                -f "apps/$service/Dockerfile" \
                --target production \
                .
        fi
        
        print_msg "$YELLOW" "Pushing $service..."
        docker push "$ACR_LOGIN_SERVER/$service:latest"
        docker push "$ACR_LOGIN_SERVER/$service:$(git rev-parse --short HEAD)"
        
        print_msg "$GREEN" "✓ $service built and pushed"
    done
}

# Deploy to Container Apps
deploy_container_apps() {
    print_header "Deploying to Azure Container Apps"
    
    local services_to_deploy=()
    
    if [ "$SERVICES" == "all" ]; then
        # Deploy in order: backend services first, then API gateway, then web
        services_to_deploy=("user-service" "movie-service" "cinema-service" "booking-service" "api-gateway" "web")
    else
        IFS=',' read -ra services_to_deploy <<< "$SERVICES"
    fi
    
    for service in "${services_to_deploy[@]}"; do
        service=$(echo "$service" | xargs)  # Trim whitespace
        print_msg "$YELLOW" "Deploying $service..."
        
        az containerapp update \
            --name "$service" \
            --resource-group "$RESOURCE_GROUP" \
            --image "$ACR_LOGIN_SERVER/$service:latest"
        
        print_msg "$GREEN" "✓ $service deployed"
        
        # Wait a bit between deployments
        sleep 10
    done
}

# Run database migrations
run_migrations() {
    print_header "Running Database Migrations"
    if [ -z "$USER_DATABASE_URL" ] || [ -z "$MOVIE_DATABASE_URL" ] || [ -z "$CINEMA_DATABASE_URL" ] || [ -z "$BOOKING_DATABASE_URL" ]; then
        print_msg "$YELLOW" "Database URLs not fully loaded; please set them manually (USER_DATABASE_URL, MOVIE_DATABASE_URL, CINEMA_DATABASE_URL, BOOKING_DATABASE_URL)."
        return 0
    fi

    print_msg "$YELLOW" "Using database URLs from terraform.tfvars"
    echo "  USER_DATABASE_URL=$USER_DATABASE_URL"
    echo "  MOVIE_DATABASE_URL=$MOVIE_DATABASE_URL"
    echo "  CINEMA_DATABASE_URL=$CINEMA_DATABASE_URL"
    echo "  BOOKING_DATABASE_URL=$BOOKING_DATABASE_URL"
    echo ""
    echo "Run migrations manually if needed:"
    cd apps/user-service   && DATABASE_URL=$USER_DATABASE_URL   npx prisma migrate deploy && cd ../..
    cd apps/movie-service  && DATABASE_URL=$MOVIE_DATABASE_URL  npx prisma migrate deploy && cd ../..
    cd apps/cinema-service && DATABASE_URL=$CINEMA_DATABASE_URL npx prisma migrate deploy && cd ../..
    cd apps/booking-service && DATABASE_URL=$BOOKING_DATABASE_URL npx prisma migrate deploy && cd ../..
}

# Health check
health_check() {
    print_header "Running Health Checks"
    
    # Get API Gateway URL
    API_GATEWAY_FQDN=$(az containerapp show \
        --name api-gateway \
        --resource-group "$RESOURCE_GROUP" \
        --query "properties.configuration.ingress.fqdn" -o tsv)
    
    API_URL="https://$API_GATEWAY_FQDN"
    
    print_msg "$YELLOW" "API Gateway URL: $API_URL"
    print_msg "$YELLOW" "Checking health endpoint..."
    
    for i in {1..5}; do
        RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$API_URL/api/health" || echo "000")
        if [ "$RESPONSE" == "200" ]; then
            print_msg "$GREEN" "✓ Health check passed!"
            return 0
        fi
        print_msg "$YELLOW" "Attempt $i: HTTP $RESPONSE - Retrying in 30s..."
        sleep 30
    done
    
    print_msg "$RED" "✗ Health check failed after 5 attempts"
    return 1
}

# Print deployment summary
print_summary() {
    print_header "Deployment Summary"
    
    API_GATEWAY_FQDN=$(az containerapp show \
        --name api-gateway \
        --resource-group "$RESOURCE_GROUP" \
        --query "properties.configuration.ingress.fqdn" -o tsv 2>/dev/null || echo "N/A")
    
    echo ""
    echo "Environment:     $ENVIRONMENT"
    echo "Resource Group:  $RESOURCE_GROUP"
    echo "ACR:             $ACR_LOGIN_SERVER"
    echo "API Gateway:     https://$API_GATEWAY_FQDN"
    echo ""
    
    print_msg "$YELLOW" "Services Status:"
    az containerapp list --resource-group "$RESOURCE_GROUP" --output table 2>/dev/null || echo "Unable to fetch status"
}

# Main function
main() {
    print_msg "$BLUE" "
    ╔═══════════════════════════════════════════╗
    ║     MovieHub Manual Deployment Script     ║
    ╚═══════════════════════════════════════════╝
    "
    
    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            --env)
                ENVIRONMENT="$2"
                shift 2
                ;;
            --infra)
                DEPLOY_INFRA="true"
                shift
                ;;
            --services)
                SERVICES="$2"
                shift 2
                ;;
            --help)
                echo "Usage: $0 [options]"
                echo ""
                echo "Options:"
                echo "  --env <env>        Environment (dev, staging, prod). Default: dev"
                echo "  --infra            Deploy infrastructure with Terraform"
                echo "  --services <list>  Comma-separated list of services or 'all'. Default: all"
                echo ""
                echo "Examples:"
                echo "  $0 --env dev --infra                    # Deploy infra + all services"
                echo "  $0 --env prod --services api-gateway    # Deploy only api-gateway to prod"
                echo "  $0 --services user-service,movie-service # Deploy specific services"
                exit 0
                ;;
            *)
                print_msg "$RED" "Unknown option: $1"
                exit 1
                ;;
        esac
    done
    
    check_prerequisites
    load_env
    azure_login
    
    if [ "$DEPLOY_INFRA" == "true" ]; then
        deploy_infrastructure
    fi
    
    build_push_images
    deploy_container_apps
    run_migrations
    health_check
    print_summary
    
    print_msg "$GREEN" "
    ╔═══════════════════════════════════════════╗
    ║         Deployment Complete! 🚀           ║
    ╚═══════════════════════════════════════════╝
    "
}

# Run main
main "$@"
