FROM node:20-alpine
WORKDIR /app

# Copy dependency files
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source code and build static files to /out
COPY . .
RUN npm run build

EXPOSE 3000

# Serve the static out/ directory on port 3000
CMD ["npx", "--yes", "serve", "out", "-p", "3000"]