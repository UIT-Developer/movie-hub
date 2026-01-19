#!/bin/bash

# ===========================================
# DIAGNOSE AND FIX WEBSOCKET BUILD ISSUE
# ===========================================
# This script helps diagnose why WebSocket is
# connecting to localhost instead of the real URL
# ===========================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}╔═══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  WebSocket Build Diagnostic Tool         ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════╝${NC}\n"

# Step 1: Check .env files
echo -e "${CYAN}Step 1: Checking .env files...${NC}\n"

if [ -f "apps/web/.env" ]; then
    echo -e "${GREEN}✓ apps/web/.env exists${NC}"
    echo "  NEXT_PUBLIC_WEBSOCKET_URL:"
    grep NEXT_PUBLIC_WEBSOCKET_URL apps/web/.env || echo "  ${RED}NOT FOUND${NC}"
else
    echo -e "${RED}✗ apps/web/.env does not exist${NC}"
fi

echo ""

if [ -f ".env" ]; then
    echo -e "${GREEN}✓ .env exists${NC}"
    echo "  NEXT_PUBLIC_WEBSOCKET_URL:"
    grep NEXT_PUBLIC_WEBSOCKET_URL .env || echo "  ${RED}NOT FOUND${NC}"
else
    echo -e "${YELLOW}⚠ .env does not exist (optional)${NC}"
fi

# Step 2: Explain the problem
echo -e "\n${CYAN}Step 2: Understanding the Problem${NC}\n"
echo -e "${YELLOW}⚠️  CRITICAL: .env files are NOT read during Docker build!${NC}\n"
echo "Next.js only reads .env during 'npm run dev' or 'npm run build' (local)."
echo "In Docker, you MUST pass --build-arg flags explicitly."
echo ""
echo "Example of WRONG build:"
echo -e "${RED}  docker build -f apps/web/Dockerfile .${NC}"
echo "  ↳ Uses default: ws://localhost:4000"
echo ""
echo "Example of CORRECT build:"
echo -e "${GREEN}  docker build --build-arg NEXT_PUBLIC_WEBSOCKET_URL=wss://api-gateway.com -f apps/web/Dockerfile .${NC}"
echo "  ↳ Uses: wss://api-gateway.com"
echo ""

# Step 3: Check if variables are exported
echo -e "${CYAN}Step 3: Checking exported environment variables${NC}\n"

if [ -z "$NEXT_PUBLIC_WEBSOCKET_URL" ]; then
    echo -e "${RED}✗ NEXT_PUBLIC_WEBSOCKET_URL is not exported${NC}"
    echo "  This means docker-compose will use the default value"
else
    echo -e "${GREEN}✓ NEXT_PUBLIC_WEBSOCKET_URL is exported${NC}"
    echo "  Value: $NEXT_PUBLIC_WEBSOCKET_URL"
fi

# Step 4: Show correct commands
echo -e "\n${CYAN}Step 4: Correct Build Commands${NC}\n"

echo -e "${YELLOW}For Local Docker Build:${NC}"
echo -e "${GREEN}docker build \\
  --build-arg NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:3000 \\
  --build-arg NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1 \\
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_... \\
  -t moviehub-web:local \\
  -f apps/web/Dockerfile \\
  --no-cache \\
  .${NC}"

echo ""
echo -e "${YELLOW}For Azure/Production:${NC}"
echo -e "${GREEN}docker build \\
  --build-arg NEXT_PUBLIC_WEBSOCKET_URL=wss://api-gateway.gentlemoss-ee6e319d.southeastasia.azurecontainerapps.io \\
  --build-arg NEXT_PUBLIC_API_URL=https://api-gateway.gentlemoss-ee6e319d.southeastasia.azurecontainerapps.io/api/v1 \\
  --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_... \\
  -t moviehubacrstaging.azurecr.io/web:latest \\
  -f apps/web/Dockerfile \\
  --no-cache \\
  .${NC}"

echo ""
echo -e "${YELLOW}For Docker Compose:${NC}"
echo "1. Export variables first:"
echo -e "${GREEN}export NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:3000"
echo "export NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1"
echo "export NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...${NC}"
echo ""
echo "2. Then build:"
echo -e "${GREEN}docker compose build web --no-cache${NC}"
echo ""
echo "OR use the helper script:"
echo -e "${GREEN}./scripts/docker-build-web.sh --compose${NC}"

# Step 5: Offer to fix
echo -e "\n${CYAN}Step 5: Auto-Fix Options${NC}\n"

echo "Choose an option:"
echo "  1) Build for LOCAL development (ws://localhost:3000)"
echo "  2) Build for AZURE production (wss://api-gateway...)"
echo "  3) Export variables for docker-compose"
echo "  4) Exit (I'll do it manually)"
echo ""
read -p "Enter choice [1-4]: " choice

case $choice in
    1)
        echo -e "\n${YELLOW}Building for LOCAL development...${NC}\n"
        docker build \
            --build-arg NEXT_PUBLIC_WEBSOCKET_URL="ws://localhost:3000" \
            --build-arg NEXT_PUBLIC_API_URL="http://localhost:3000/api/v1" \
            --build-arg NEXT_PUBLIC_BACKEND_API_URL="http://localhost:3000/api/v1" \
            --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:-pk_test_bWludC1sYWItODguY2xlcmsuYWNjb3VudHMuZGV2JA}" \
            --build-arg NEXT_PUBLIC_CLERK_SIGN_IN_URL="/admin/login" \
            --build-arg NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/admin" \
            --build-arg NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up" \
            --build-arg NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL="/admin/login" \
            --build-arg NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/admin" \
            -t moviehub-web:local \
            -f apps/web/Dockerfile \
            --no-cache \
            .
        
        echo -e "\n${GREEN}✓ Build complete!${NC}"
        echo -e "${YELLOW}Run: docker run -p 5200:4200 moviehub-web:local${NC}"
        ;;
    
    2)
        echo -e "\n${YELLOW}Building for AZURE production...${NC}\n"
        
        # Get API Gateway URL
        TFVARS_PATH="infra/terraform/terraform.tfvars"
        if [ -f "$TFVARS_PATH" ]; then
            API_GATEWAY_URL=$(grep -A 10 "web_env" "$TFVARS_PATH" | grep "NEXT_PUBLIC_API_BASE_URL" | cut -d'"' -f2 | head -1)
            API_GATEWAY_FQDN=$(echo "$API_GATEWAY_URL" | sed 's|https://||' | sed 's|http://||')
            CLERK_KEY=$(grep -E "^clerk_publishable_key" "$TFVARS_PATH" | cut -d'"' -f2)
        else
            echo -e "${RED}✗ terraform.tfvars not found${NC}"
            exit 1
        fi
        
        echo "Using:"
        echo "  API Gateway: $API_GATEWAY_FQDN"
        echo "  WebSocket: wss://$API_GATEWAY_FQDN"
        echo ""
        
        docker build \
            --build-arg NEXT_PUBLIC_WEBSOCKET_URL="wss://${API_GATEWAY_FQDN}" \
            --build-arg NEXT_PUBLIC_API_URL="https://${API_GATEWAY_FQDN}/api/v1" \
            --build-arg NEXT_PUBLIC_BACKEND_API_URL="https://${API_GATEWAY_FQDN}/api/v1" \
            --build-arg NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="$CLERK_KEY" \
            --build-arg NEXT_PUBLIC_CLERK_SIGN_IN_URL="/admin/login" \
            --build-arg NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/admin" \
            --build-arg NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up" \
            --build-arg NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL="/admin/login" \
            --build-arg NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/admin" \
            -t moviehub-web:azure \
            -f apps/web/Dockerfile \
            --no-cache \
            .
        
        echo -e "\n${GREEN}✓ Build complete!${NC}"
        echo -e "${YELLOW}To push to ACR and deploy:${NC}"
        echo "  docker tag moviehub-web:azure moviehubacrstaging.azurecr.io/web:latest"
        echo "  docker push moviehubacrstaging.azurecr.io/web:latest"
        echo "  az containerapp update --name web --resource-group rg-moviehub-staging --image moviehubacrstaging.azurecr.io/web:latest"
        ;;
    
    3)
        echo -e "\n${YELLOW}Exporting variables for docker-compose...${NC}\n"
        
        # Load from apps/web/.env
        if [ -f "apps/web/.env" ]; then
            source apps/web/.env
        fi
        
        echo "Add these to your shell session:"
        echo -e "${GREEN}export NEXT_PUBLIC_WEBSOCKET_URL=\"${NEXT_PUBLIC_WEBSOCKET_URL:-ws://localhost:3000}\""
        echo "export NEXT_PUBLIC_API_URL=\"${NEXT_PUBLIC_API_URL:-http://localhost:3000/api/v1}\""
        echo "export NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=\"${NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}\"${NC}"
        echo ""
        echo "Then run:"
        echo -e "${GREEN}docker compose build web --no-cache${NC}"
        ;;
    
    4)
        echo -e "\n${YELLOW}Exiting. Remember to pass --build-arg flags!${NC}"
        ;;
    
    *)
        echo -e "${RED}Invalid choice${NC}"
        ;;
esac

echo ""
echo -e "${BLUE}╔═══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Diagnostic Complete                      ║${NC}"
echo -e "${BLUE}╚═══════════════════════════════════════════╝${NC}"
