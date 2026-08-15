# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Install pnpm and dependencies
COPY package.json pnpm-lock.yaml ./
# install pnpm (pinned) and try a strict install first; if lockfile is incompatible
# fall back to a normal install so local builds succeed even when lockfile was
# created with a different pnpm minor version.
RUN npm install -g pnpm@8.7.0 \
	&& (pnpm install --frozen-lockfile || pnpm install)

# Copy sources and build
COPY . .
RUN pnpm build

# Production stage: nginx serving static files
FROM nginx:stable-alpine

# Remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# Copy built app
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
