# ===========================================
# DEPENDENCIES STAGE - Install all deps
# ===========================================
FROM node:18-alpine AS deps

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy only package files for better caching
COPY package.json pnpm-lock.yaml* ./


# Install ALL dependencies (needed for build)
RUN pnpm install --frozen-lockfile || pnpm install

# ===========================================
# BUILD STAGE - Build the application
# ===========================================
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source files needed for build
COPY package.json pnpm-lock.yaml* ./
COPY nx.json ./
COPY tsconfig.base.json ./
COPY libs ./libs
COPY eslint.config.mjs ./
COPY apps/movie-service ./apps/movie-service

# Generate Prisma Client for movie-service
WORKDIR /app/apps/movie-service
RUN npx prisma generate

# Build the movie-service using Nx
WORKDIR /app
RUN npx nx build movie-service --prod

# ===========================================
# PRODUCTION STAGE - Minimal runtime image
# ===========================================
FROM node:18-alpine AS production

# Install openssl for Prisma and pnpm
RUN apk add --no-cache openssl && npm install -g pnpm

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001

WORKDIR /app

# Copy the Nx-generated package.json (minimal dependencies only!)
COPY --chown=nestjs:nodejs --from=builder /app/dist/apps/movie-service/package*.json ./

# Install ONLY the minimal dependencies from Nx-generated package.json
# Also install tslib separately as it's needed at runtime but not included by Nx
RUN pnpm install --prod && \
    pnpm add tslib && \
    npm cache clean --force

# Copy ONLY the built application and Prisma files
COPY --chown=nestjs:nodejs --from=builder /app/dist/apps/movie-service ./
COPY --chown=nestjs:nodejs --from=builder /app/apps/movie-service/generated ./generated
COPY --chown=nestjs:nodejs --from=builder /app/apps/movie-service/prisma ./prisma
USER nestjs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node --version || exit 1

# Expose TCP port (configured via environment)
EXPOSE 3002

# Start the application
CMD ["node", "main.js"]
