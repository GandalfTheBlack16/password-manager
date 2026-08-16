# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Accept Vite env vars at build time so they are embedded in the generated bundle.
ARG VITE_BACKEND_BASE_URI
ARG VITE_GITHUB_CLIENT_ID
ARG VITE_GITHUB_REDIRECT_URI
ARG VITE_RESTORE_PWD_BASE_URI
ENV VITE_BACKEND_BASE_URI=${VITE_BACKEND_BASE_URI}
ENV VITE_GITHUB_CLIENT_ID=${VITE_GITHUB_CLIENT_ID}
ENV VITE_GITHUB_REDIRECT_URI=${VITE_GITHUB_REDIRECT_URI}
ENV VITE_RESTORE_PWD_BASE_URI=${VITE_RESTORE_PWD_BASE_URI}

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

# Set the runtime default port used locally and by Railway.
ENV PORT=8080

# Remove default nginx html
RUN rm -rf /usr/share/nginx/html/*

# Copy built app
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config for SPA fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["/bin/sh", "-c", "sed -i \"s|listen 80;|listen ${PORT:-8080};|g\" /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;' "]
