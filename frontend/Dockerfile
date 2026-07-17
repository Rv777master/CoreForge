# ---- Build Stage ----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---- Production Stage ----
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Custom nginx config with SPA fallback routing — without this, direct
# links or hard refreshes on routes like /prebuilt or /about return a
# real 404 instead of letting React Router handle them.
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
