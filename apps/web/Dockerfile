# ===========================================
# DEPENDENCIES STAGE - Install all deps
# ===========================================
FROM node:20-alpine AS deps

WORKDIR /app
RUN npm install -g npm@latest && npm -v
# Copy only package files for better caching
COPY package*.json ./

# Install ALL dependencies (needed for build)
RUN npm install --legacy-peer-deps

# ===========================================
# BUILD STAGE - Build Next.js application
# ===========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source files needed for build
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./
COPY eslint.config.mjs ./
COPY libs ./libs
COPY apps/web ./apps/web

# Build the web app using Nx (creates standalone output)
# No build-time env vars needed - everything is runtime now
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1
RUN NODE_ENV=production npx nx run web:build

# ===========================================
# PRODUCTION STAGE - Minimal Next.js runtime using standalone output
# ===========================================
FROM node:20-alpine AS production

# Install wget for healthcheck
RUN apk add --no-cache wget

WORKDIR /app

# Runtime environment variables - can be changed without rebuild
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=4200 \
    NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:3000 \
    NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1 \
    NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3000/api/v1

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

# Copy standalone output (includes minimal node_modules)
COPY --chown=nextjs:nodejs --from=builder /app/dist/apps/web/.next/standalone ./

# Copy .next to the location expected by the distDir config (./../../dist/apps/web/.next from server.js)
# server.js is at /app/apps/web/server.js, so distDir resolves to /app/dist/apps/web/.next
COPY --chown=nextjs:nodejs --from=builder /app/dist/apps/web/.next ./dist/apps/web/.next

# Copy public directory
COPY --chown=nextjs:nodejs --from=builder /app/dist/apps/web/public ./apps/web/public

USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:4200/ || exit 1

# Expose HTTP port
EXPOSE 4200

# Start Next.js using standalone server
CMD ["node", "apps/web/server.js"]