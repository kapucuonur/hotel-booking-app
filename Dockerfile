FROM node:20-alpine

WORKDIR /app

# Copy package files and the prisma folder first
# This ensures that postinstall scripts like `prisma generate` work correctly via npm ci
COPY package.json package-lock.json* ./
COPY prisma ./prisma

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build Next.js
RUN npm run build

EXPOSE 3000

# Start the built Next.js server
CMD ["npm", "start"]
