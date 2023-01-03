# NodeJS
FROM node:18-slim as build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# nginx
FROM nginx:1.22-alpine
COPY --from=build /usr/src/app/dist/assinatura-uft /usr/share/nginx/html
EXPOSE 80
