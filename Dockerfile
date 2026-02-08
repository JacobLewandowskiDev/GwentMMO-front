# Stage 1: Build
FROM node:18-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# This uses the 'base: /gwent/' added to vite.config.ts
RUN npm run build

# Stage 2: Serve
FROM nginx:stable-alpine
# Copy the built files to the Nginx folder
COPY --from=build-stage /app/dist /usr/share/nginx/html/gwent
# Copy your internal nginx config (see below)
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]