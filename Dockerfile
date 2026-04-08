# Use lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy full project
COPY . .

# Build the app (TypeScript → dist/)
RUN npm run build

# Expose backend port
EXPOSE 3000

# Run compiled app
CMD ["node", "dist/main.js"]