#!/bin/bash

# ===========================================
# BUILD WEB SERVICE WITH BUILD-TIME ENV VARS
# ===========================================
# This script builds the web service Docker image
# with proper build-time environment variables injected
# ===========================================

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo -e "${BLUE}╔═══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Build Web Service with Credentials      ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════╝${NC}\n"

cd "$PROJECT_ROOT"

# Check if .env exists, fallback to .env.docker.local
if [ -f ".env" ]; then
    echo -e "${GREEN}✓ Using .env file${NC}"
    source .env
elif [ -f ".env.docker.local" ]; then
    echo -e "${YELLOW}⚠ Using .env.docker.local (consider copying to .env)${NC}"
    source .env.docker.local
else
    echo -e "${YELLOW}⚠ No .env file found, using defaults${NC}"
fi

# Load from apps/web/.env if exists
if [ -f "apps/web/.env" ]; then
    echo -e "${GREEN}✓ Also loading from apps/web/.env${NC}"
    source apps/web/.env
fi

# Export for docker-compose
export NEXT_PUBLIC_API_URL="${NEXT_PUBLIC_API_URL:-http://localhost:3000/api/v1}"
export NEXT_PUBLIC_BACKEND_API_URL="${NEXT_PUBLIC_BACKEND_API_URL:-http://localhost:3000/api/v1}"
export NEXT_PUBLIC_WEBSOCKET_URL="${NEXT_PUBLIC_WEBSOCKET_URL:-ws://localhost:3000}"
export NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}"
export NEXT_PUBLIC_CLERK_SIGN_IN_URL="${NEXT_PUBLIC_CLERK_SIGN_IN_URL:-/admin/login}"
export NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="${NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:-/admin}"
export NEXT_PUBLIC_CLERK_SIGN_UP_URL="${NEXT_PUBLIC_CLERK_SIGN_UP_URL:-/sign-up}"
export NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL="${NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL:-/admin/login}"
export NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="${NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:-/admin}"

echo ""
echo -e "${BLUE}Build Configuration:${NC}"
echo "  API URL: $NEXT_PUBLIC_API_URL"
echo "  WebSocket URL: $NEXT_PUBLIC_WEBSOCKET_URL"
echo "  Clerk Key: ${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:0:20}..."
echo ""

# Option 1: Build with docker-compose
if [ "$1" == "--compose" ] || [ "$1" == "-c" ]; then
    echo -e "${YELLOW}Building with docker-compose...${NC}\n"
    docker compose build web --no-cache
    echo -e "\n${GREEN}✓ Build complete!${NC}"
    echo -e "${YELLOW}Run: docker compose up -d web${NC}"
    
# Option 2: Build with Docker directly
else
    echo -e "${YELLOW}Building with Docker...${NC}\n"
    docker build \
        --build-arg NEXT_PUBLIC_API_URL="$NEXT_PUBLIC_API_URL" \
        --build-arg NEXT_PUBLIC_BACKEND_API_URL="$NEXT_PUBLIC_BACKEND_API_URL" \
        --build-arg NEXT_PUBLIC_WEBSOCKET_URL="$NEXT_PUBLIC_WEBSOCKET_URL" \
        --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="$NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" \
        --build-arg NEXT_PUBLIC_CLERK_SIGN_IN_URL="$NEXT_PUBLIC_CLERK_SIGN_IN_URL" \
        --build-arg NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="$NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL" \
        --build-arg NEXT_PUBLIC_CLERK_SIGN_UP_URL="$NEXT_PUBLIC_CLERK_SIGN_UP_URL" \
        --build-arg NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL="$NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL" \
        --build-arg NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="$NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL" \
        -t moviehub-web:latest \
        -f apps/web/Dockerfile \
        --target production \
        --no-cache \
        .
    
    echo -e "\n${GREEN}✓ Build complete!${NC}"
    echo -e "${YELLOW}Run: docker run -p 5200:4200 moviehub-web:latest${NC}"
fi

echo ""
echo -e "${BLUE}╔═══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Build Complete! 🚀                      ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════╝${NC}"
