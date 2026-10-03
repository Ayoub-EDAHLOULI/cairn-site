# Use Node 20 Alpine for a small, secure image
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Critical: Use legacy-peer-deps to allow Next.js 16 with Analytics
RUN npm install --legacy-peer-deps

# Copy the rest of the code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose internal port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]