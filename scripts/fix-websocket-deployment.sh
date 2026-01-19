#!/bin/bash

# ===========================================
# FIX WEBSOCKET DEPLOYMENT ISSUE
# Rebuild web with correct URLs and deploy
# ===========================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo -e "${BLUE}╔═══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Fix WebSocket Deployment Issue          ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════╝${NC}\n"

cd "$PROJECT_ROOT"

# Load from terraform.tfvars
TFVARS_PATH="${PROJECT_ROOT}/infra/terraform/terraform.tfvars"

if [ ! -f "$TFVARS_PATH" ]; then
    echo -e "${RED}✗ terraform.tfvars not found${NC}"
    exit 1
fi

# Extract values
ACR_NAME=$(grep -E "^acr_name" "$TFVARS_PATH" | cut -d'"' -f2)
ENVIRONMENT="${ENVIRONMENT:-staging}"
ACR_NAME="${ACR_NAME}${ENVIRONMENT}"
ACR_LOGIN_SERVER="${ACR_NAME}.azurecr.io"
RESOURCE_GROUP=$(grep -E "^resource_group_name" "$TFVARS_PATH" | cut -d'"' -f2)
RESOURCE_GROUP="${RESOURCE_GROUP}-${ENVIRONMENT}"

# Get API Gateway URL
echo -e "${YELLOW}Fetching API Gateway URL from Azure...${NC}"
API_GATEWAY_FQDN=$(az containerapp show \
    --name api-gateway \
    --resource-group "$RESOURCE_GROUP" \
    --query "properties.configuration.ingress.fqdn" -o tsv 2>/dev/null)

if [ -z "$API_GATEWAY_FQDN" ]; then
    echo -e "${RED}✗ Could not fetch API Gateway FQDN${NC}"
    echo -e "${YELLOW}Falling back to terraform.tfvars value${NC}"
    API_GATEWAY_URL=$(grep -A 10 "web_env" "$TFVARS_PATH" | grep "NEXT_PUBLIC_API_BASE_URL" | cut -d'"' -f2 | head -1)
    API_GATEWAY_FQDN=$(echo "$API_GATEWAY_URL" | sed 's|https://||' | sed 's|http://||')
fi

CLERK_PUB_KEY=$(grep -E "^clerk_publishable_key" "$TFVARS_PATH" | cut -d'"' -f2)

echo ""
echo -e "${BLUE}Configuration:${NC}"
echo "  ACR: $ACR_LOGIN_SERVER"
echo "  Resource Group: $RESOURCE_GROUP"
echo "  API Gateway: $API_GATEWAY_FQDN"
echo "  Clerk Key: ${CLERK_PUB_KEY:0:20}..."
echo ""

# Login to Azure and ACR
echo -e "${YELLOW}Logging in to ACR...${NC}"
az acr login --name "$ACR_NAME"

# Build with correct URLs
echo -e "${BLUE}╔═══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Building Web Image with Correct URLs    ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════╝${NC}\n"

echo -e "${YELLOW}Building image with:${NC}"
echo "  API URL: https://${API_GATEWAY_FQDN}/api/v1"
echo "  WebSocket URL: wss://${API_GATEWAY_FQDN}"
echo ""

docker build \
    --build-arg NEXT_PUBLIC_API_URL="https://${API_GATEWAY_FQDN}/api/v1" \
    --build-arg NEXT_PUBLIC_BACKEND_API_URL="https://${API_GATEWAY_FQDN}/api/v1" \
    --build-arg NEXT_PUBLIC_WEBSOCKET_URL="wss://${API_GATEWAY_FQDN}" \
    --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="$CLERK_PUB_KEY" \
    --build-arg NEXT_PUBLIC_CLERK_SIGN_IN_URL="/admin/login" \
    --build-arg NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/admin" \
    --build-arg NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up" \
    --build-arg NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL="/admin/login" \
    --build-arg NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/admin" \
    -t "$ACR_LOGIN_SERVER/web:latest" \
    -t "$ACR_LOGIN_SERVER/web:websocket-fix-$(date +%s)" \
    -f apps/web/Dockerfile \
    --target production \
    --no-cache \
    .

echo -e "\n${GREEN}✓ Build complete!${NC}\n"

# Push to ACR
echo -e "${YELLOW}Pushing to ACR...${NC}"
docker push "$ACR_LOGIN_SERVER/web:latest"

echo -e "\n${GREEN}✓ Pushed to ACR!${NC}\n"

# Update Container App
echo -e "${BLUE}╔═══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Updating Azure Container App            ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════╝${NC}\n"

az containerapp update \
    --name web \
    --resource-group "$RESOURCE_GROUP" \
    --image "$ACR_LOGIN_SERVER/web:latest"

echo -e "\n${GREEN}✓ Container App updated!${NC}\n"

# Wait for deployment
echo -e "${YELLOW}Waiting for deployment to stabilize (30s)...${NC}"
sleep 30

# Get web URL
WEB_FQDN=$(az containerapp show \
    --name web \
    --resource-group "$RESOURCE_GROUP" \
    --query "properties.configuration.ingress.fqdn" -o tsv)

echo ""
echo -e "${BLUE}╔═══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Deployment Complete!                     ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════╝${NC}\n"

echo -e "${GREEN}Web URL: https://${WEB_FQDN}${NC}"
echo ""
echo -e "${YELLOW}Verification Steps:${NC}"
echo "1. Open: https://${WEB_FQDN}"
echo "2. Navigate to a showtime page"
echo "3. Open browser DevTools (F12) → Console"
echo "4. Look for: ${GREEN}[Socket] Connecting to: wss://${API_GATEWAY_FQDN}${NC}"
echo "5. Then: ${GREEN}[Socket] Connected successfully${NC}"
echo ""
echo -e "${YELLOW}If still seeing ws://localhost:3000, hard refresh (Ctrl+Shift+R)${NC}"
