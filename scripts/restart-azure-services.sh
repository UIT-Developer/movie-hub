#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname "$0")" >/dev/null 2>&1 && pwd)"
PROJECT_ROOT="$(cd -- "${SCRIPT_DIR}/.." >/dev/null 2>&1 && pwd)"
TFVARS_PATH="${TFVARS_PATH:-${PROJECT_ROOT}/infra/terraform/terraform.tfvars}"
ENVIRONMENT="${ENVIRONMENT:-staging}"

if ! command -v az >/dev/null 2>&1; then
  echo "Azure CLI (az) is required" >&2
  exit 1
fi

if [ ! -f "$TFVARS_PATH" ]; then
  echo "terraform.tfvars not found at $TFVARS_PATH" >&2
  exit 1
fi

RESOURCE_GROUP_BASE=$(grep -E "^resource_group_name" "$TFVARS_PATH" | cut -d'"' -f2)
RESOURCE_GROUP="${RESOURCE_GROUP_BASE}-${ENVIRONMENT}"

SERVICES=(
  user-service
  movie-service
  cinema-service
  booking-service
  api-gateway
)

echo "Restarting Azure Container Apps in resource group: $RESOURCE_GROUP"
for svc in "${SERVICES[@]}"; do
  echo "- Restarting $svc"
  az containerapp restart --name "$svc" --resource-group "$RESOURCE_GROUP"
done

echo "Done. Current status:"
az containerapp list --resource-group "$RESOURCE_GROUP" --output table
