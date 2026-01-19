#!/bin/bash

# ================================================
# Movie Hub - Migrate All Schemas (Development)
# ================================================
# This script runs Prisma migrations for all services
# using credentials from infra/terraform/terraform.tfvars
# ================================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_ROOT="$( cd "$SCRIPT_DIR/.." && pwd )"

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}Movie Hub - Database Migration Script${NC}"
echo -e "${BLUE}================================================${NC}\n"

# Database URLs from terraform.tfvars
USER_DB_URL="postgresql://neondb_owner:npg_dj4FEvXlP2Uz@ep-rough-forest-a1o9icd0-pooler.ap-southeast-1.aws.neon.tech/user-service?sslmode=require&channel_binding=require"
MOVIE_DB_URL="postgresql://neondb_owner:npg_dj4FEvXlP2Uz@ep-rough-forest-a1o9icd0-pooler.ap-southeast-1.aws.neon.tech/movie-service?sslmode=require&channel_binding=require"
CINEMA_DB_URL="postgresql://neondb_owner:npg_dj4FEvXlP2Uz@ep-rough-forest-a1o9icd0-pooler.ap-southeast-1.aws.neon.tech/cinema-service?sslmode=require&channel_binding=require"
BOOKING_DB_URL="postgresql://neondb_owner:npg_dj4FEvXlP2Uz@ep-rough-forest-a1o9icd0-pooler.ap-southeast-1.aws.neon.tech/booking-service?sslmode=require&channel_binding=require"

# Function to run migration for a service
migrate_service() {
    local service_name=$1
    local db_url=$2
    local service_path="$PROJECT_ROOT/apps/$service_name"
    
    echo -e "\n${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${YELLOW}🔄 Migrating: $service_name${NC}"
    echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    
    if [ ! -d "$service_path" ]; then
        echo -e "${RED}❌ Error: Service directory not found: $service_path${NC}"
        return 1
    fi
    
    if [ ! -d "$service_path/prisma" ]; then
        echo -e "${YELLOW}⚠️  Warning: No prisma directory found for $service_name, skipping...${NC}"
        return 0
    fi
    
    cd "$service_path"
    
    echo -e "${BLUE}📍 Working directory: $(pwd)${NC}"
    echo -e "${BLUE}🔗 Database: ${db_url%%\?*}...${NC}\n"
    
    # Run Prisma migrate dev
    if DATABASE_URL="$db_url" npx prisma migrate dev; then
        echo -e "\n${GREEN}✅ Successfully migrated $service_name${NC}"
        
        # Generate Prisma client
        echo -e "\n${BLUE}📦 Generating Prisma client...${NC}"
        if DATABASE_URL="$db_url" npx prisma generate; then
            echo -e "${GREEN}✅ Prisma client generated for $service_name${NC}"
        else
            echo -e "${RED}❌ Failed to generate Prisma client for $service_name${NC}"
            return 1
        fi
    else
        echo -e "\n${RED}❌ Failed to migrate $service_name${NC}"
        return 1
    fi
}

# Track success/failure
FAILED_SERVICES=()
SUCCESSFUL_SERVICES=()

# Migrate all services
echo -e "${BLUE}Starting migrations for all services...${NC}\n"

# User Service
if migrate_service "user-service" "$USER_DB_URL"; then
    SUCCESSFUL_SERVICES+=("user-service")
else
    FAILED_SERVICES+=("user-service")
fi

# Movie Service
if migrate_service "movie-service" "$MOVIE_DB_URL"; then
    SUCCESSFUL_SERVICES+=("movie-service")
else
    FAILED_SERVICES+=("movie-service")
fi

# Cinema Service
if migrate_service "cinema-service" "$CINEMA_DB_URL"; then
    SUCCESSFUL_SERVICES+=("cinema-service")
else
    FAILED_SERVICES+=("cinema-service")
fi

# Booking Service
if migrate_service "booking-service" "$BOOKING_DB_URL"; then
    SUCCESSFUL_SERVICES+=("booking-service")
else
    FAILED_SERVICES+=("booking-service")
fi

# Summary
echo -e "\n${BLUE}================================================${NC}"
echo -e "${BLUE}Migration Summary${NC}"
echo -e "${BLUE}================================================${NC}\n"

if [ ${#SUCCESSFUL_SERVICES[@]} -gt 0 ]; then
    echo -e "${GREEN}✅ Successful migrations (${#SUCCESSFUL_SERVICES[@]}):${NC}"
    for service in "${SUCCESSFUL_SERVICES[@]}"; do
        echo -e "   ${GREEN}•${NC} $service"
    done
fi

if [ ${#FAILED_SERVICES[@]} -gt 0 ]; then
    echo -e "\n${RED}❌ Failed migrations (${#FAILED_SERVICES[@]}):${NC}"
    for service in "${FAILED_SERVICES[@]}"; do
        echo -e "   ${RED}•${NC} $service"
    done
    echo -e "\n${RED}Some migrations failed. Please check the errors above.${NC}"
    exit 1
else
    echo -e "\n${GREEN}🎉 All migrations completed successfully!${NC}"
fi

# Return to project root
cd "$PROJECT_ROOT"

echo -e "\n${BLUE}================================================${NC}"
echo -e "${BLUE}Next Steps:${NC}"
echo -e "${BLUE}================================================${NC}"
echo -e "1. Run '${YELLOW}npm run start:dev${NC}' to start the services"
echo -e "2. Run '${YELLOW}./scripts/seed-all.sh${NC}' to seed the databases"
echo -e "\n"
