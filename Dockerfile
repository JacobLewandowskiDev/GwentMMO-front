# Stage 1: Build
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# This build uses 'base: /gwent/' from your vite.config.js
RUN npm run build

# Stage 2: Serve
FROM nginx:stable-alpine

# Create the directory structure to match your 'base' and 'alias'
RUN mkdir -p /usr/share/nginx/html/gwent

# Copy the built files into the subfolder
COPY --from=build-stage /app/dist /usr/share/nginx/html/gwent

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]