FROM node:lts-slim as build

WORKDIR /usr/src/app

COPY ./package.json .
COPY ./package-lock.json .
RUN npm install

COPY . .
RUN npm run build --prod

FROM nginx:alpine
COPY --from=build /usr/src/app/dist/assinatura-uft /usr/share/nginx/html
EXPOSE 80
