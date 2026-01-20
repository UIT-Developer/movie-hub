#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname "$0")" >/dev/null 2>&1 && pwd)"
PROJECT_ROOT="$(cd -- "${SCRIPT_DIR}/.." >/dev/null 2>&1 && pwd)"
DEFAULT_TFVARS_PATH="${PROJECT_ROOT}/infra/terraform/terraform.tfvars"
TFVARS_PATH="${TFVARS_PATH:-$DEFAULT_TFVARS_PATH}"

print_msg() {
  local color="$1"; shift
  local msg="$*"
  echo -e "${color}${msg}\033[0m"
}

blue='\033[0;34m'
green='\033[0;32m'
red='\033[0;31m'
yellow='\033[1;33m'

get_db_url() {
  local key="$1"
  awk -F'"' -v k="$key" '$1 ~ k {print $2}' "$TFVARS_PATH"
}

require_file() {
  if [[ ! -f "$1" ]]; then
    print_msg "$red" "Missing required file: $1"
    exit 1
  fi
}

clear_service() {
  local name="$1"; shift
  local db_url="$1"; shift
  local path="$1"; shift

  if [[ -z "$db_url" ]]; then
    print_msg "$red" "DATABASE_URL for $name is empty. Aborting."
    exit 1
  fi

  print_msg "$blue" "Clearing $name..."
  pushd "$path" >/dev/null
  DATABASE_URL="$db_url" npx tsx ./prisma/clear.ts
  popd >/dev/null
  print_msg "$green" "✓ Cleared $name"
}

main() {
  print_msg "$blue" "=== MovieHub | Clear all services ==="

  require_file "$TFVARS_PATH"

  local user_db movie_db cinema_db booking_db
  user_db=${USER_DATABASE_URL:-$(get_db_url "user_service")}
  movie_db=${MOVIE_DATABASE_URL:-$(get_db_url "movie_service")}
  cinema_db=${CINEMA_DATABASE_URL:-$(get_db_url "cinema_service")}
  booking_db=${BOOKING_DATABASE_URL:-$(get_db_url "booking_service")}

  if [[ -z "$user_db" || -z "$movie_db" || -z "$cinema_db" || -z "$booking_db" ]]; then
    print_msg "$yellow" "One or more database_urls missing in $TFVARS_PATH. You can set USER_DATABASE_URL, MOVIE_DATABASE_URL, CINEMA_DATABASE_URL, BOOKING_DATABASE_URL manually."
  fi

  # Order matters for cross-service references (reverse of seeding)
  clear_service "user-service" "$user_db" "apps/user-service"
  clear_service "booking-service" "$booking_db" "apps/booking-service"
  clear_service "cinema-service" "$cinema_db" "apps/cinema-service"
  clear_service "movie-service" "$movie_db" "apps/movie-service"

  print_msg "$green" "All clears completed."
}

main "$@"