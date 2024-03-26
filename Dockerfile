FROM node:20-alpine as build

WORKDIR /app

ENV PATH="/app/node_modules/.bin:$PATH"

COPY . ./

RUN npm install

RUN npm run build

FROM nginx:alpine3.18-slim

COPY --from=build /app/build /opt/site

COPY nginx.conf /etc/nginx/nginx.conf



