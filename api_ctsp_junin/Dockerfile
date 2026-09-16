# Build stage: compile the NestJS application in a CI/build environment.
# This stage installs all dependencies and produces the compiled output in dist/.
FROM --platform=linux/arm64 node:20-bullseye-slim AS build

# Set working directory for all build steps.
WORKDIR /app

# Copy package manifests first so Docker can cache dependency installation.
COPY package*.json ./
RUN npm ci

# Copy the rest of the source code and run the production build.
COPY . .
RUN npm run build

# Remove development dependencies to keep the final runtime copy smaller.
RUN npm prune --production

# Runtime stage: a lightweight image containing only built artifacts.
FROM --platform=linux/arm64 node:20-bullseye-slim AS production

# Set working directory for runtime.
WORKDIR /app
ENV NODE_ENV=production

# Copy the compiled application and production dependencies from the build stage.
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

# Expose the NestJS runtime port.
EXPOSE 8000

# Start the compiled NestJS application.
CMD ["node", "dist/main"]