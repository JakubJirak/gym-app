# Build stage
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1-slim

WORKDIR /app

# Copy package.json for scripts
COPY --from=builder /app/package.json ./package.json

# Copy only the built output
COPY --from=builder /app/.output ./.output

# Expose the default port
EXPOSE 3000


# Set the command to run the startup script
CMD ["bun", "run", "start"]