#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname "$0")" >/dev/null 2>&1 && pwd)"
PROJECT_ROOT="$(cd -- "${SCRIPT_DIR}/.." >/dev/null 2>&1 && pwd)"
cd "$PROJECT_ROOT"

# Order matters: bring databases up before dependent services.
SERVICES=(
  user-service
  movie-service
  cinema-service
  booking-service
  web
  api-gateway
)

echo "Restarting services: ${SERVICES[*]}"

docker compose up -d "${SERVICES[@]}"
docker compose restart "${SERVICES[@]}"

echo "Done. Current status:"
docker compose ps "${SERVICES[@]}"
