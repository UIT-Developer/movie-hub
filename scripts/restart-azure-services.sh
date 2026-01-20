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
echo "Restarting Azure Container Apps in: $RESOURCE_GROUP"

for svc in "${SERVICES[@]}"; do
  echo -n "- Processing $svc... "

  # 1. Get the name of the latest ACTIVE revision
  # We sort by createdTime to ensure we get the newest one
  REVISION_NAME=$(az containerapp revision list \
    --name "$svc" \
    --resource-group "$RESOURCE_GROUP" \
    --query "sort_by([?properties.active], &properties.createdTime) | [-1].name" \
    --output tsv)

  if [ -n "$REVISION_NAME" ]; then
    # 2. Restart that specific revision
    # Note: 'revision restart' bounces the replicas without creating a new revision
    if az containerapp revision restart --revision "$REVISION_NAME" --resource-group "$RESOURCE_GROUP" --output none; then
      echo "✅ Restarted revision: $REVISION_NAME"
    else
      echo "❌ Failed to restart revision: $REVISION_NAME" >&2
    fi
  else
    echo "⚠️ No active revision found (is the app scaled to 0?)"
  fi
done

echo "Done. Current status:"
az containerapp list --resource-group "$RESOURCE_GROUP" --output table
