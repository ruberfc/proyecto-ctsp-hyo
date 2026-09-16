# Build stage: compile the Next.js app inside a CI/build environment.
# This stage installs dependencies and generates the production output.
FROM --platform=linux/arm64 node:20-alpine AS builder

WORKDIR /app

# Copy only package manifests first to leverage Docker layer cache.
COPY package*.json ./
RUN npm ci

# Copy full source and run the Next.js build.
COPY . .
RUN npm run build

# Runtime stage: keep only the final standalone application and static assets.
FROM --platform=linux/arm64 node:20-alpine AS runner

WORKDIR /app
ENV NODE_ENV production
ENV PORT=3000

# Install only production dependencies for runtime.
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the public assets and the standalone Next.js output from the build stage.
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Expose the frontend port and set the runtime command.
EXPOSE 3000
#ENV PORT 3000
CMD ["node", "server.js"]