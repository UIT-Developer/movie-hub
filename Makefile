.PHONY: help dev-up dev-down dev-logs dev-rebuild test-up test-down test-logs prod-up prod-down prod-logs db-migrate-dev db-seed-dev clean clean-all

help: ## Show this help message
	@echo "MovieHub Docker Compose Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  [36m%-20s[0m %s
", $$1, $$2}'

# Development Environment
dev-up: ## Start development environment
	docker compose -f docker-compose.yml -f docker-compose.dev.yml --env-file .env.dev up -d

dev-down: ## Stop development environment
	docker compose -f docker-compose.yml -f docker-compose.dev.yml --env-file .env.dev down

dev-logs: ## View development logs
	docker compose -f docker-compose.yml -f docker-compose.dev.yml --env-file .env.dev logs -f

dev-rebuild: ## Rebuild and start development environment
	docker compose -f docker-compose.yml -f docker-compose.dev.yml --env-file .env.dev up -d --build

# Test Environment
test-up: ## Start test environment
	docker compose -f docker-compose.yml -f docker-compose.test.yml --env-file .env.test up -d

test-down: ## Stop test environment
	docker compose -f docker-compose.yml -f docker-compose.test.yml --env-file .env.test down

test-logs: ## View test logs
	docker compose -f docker-compose.yml -f docker-compose.test.yml --env-file .env.test logs -f

# Production-like Environment
prod-up: ## Start production-like environment
	docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod up -d

prod-down: ## Stop production-like environment
	docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod down

prod-logs: ## View production logs
	docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod logs -f

# Database Commands
db-migrate-dev: ## Run migrations in dev environment
	docker compose -f docker-compose.yml -f docker-compose.dev.yml --env-file .env.dev exec user-service npx prisma migrate deploy
	docker compose -f docker-compose.yml -f docker-compose.dev.yml --env-file .env.dev exec movie-service npx prisma migrate deploy

db-seed-dev: ## Seed dev database
	docker compose -f docker-compose.yml -f docker-compose.dev.yml --env-file .env.dev exec movie-service npm run seed

# Cleanup
clean: ## Remove all containers, volumes, and networks
	docker compose -f docker-compose.yml -f docker-compose.dev.yml down -v
	docker compose -f docker-compose.yml -f docker-compose.test.yml down -v
	docker compose -f docker-compose.yml -f docker-compose.prod.yml down -v

clean-all: clean ## Clean everything including images
	docker system prune -af --volumes
