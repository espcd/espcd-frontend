FROM node:current-alpine as BUILD

WORKDIR /app

ENV \
    PATH=/app/node_modules/.bin:$PATH \
    GENERATE_SOURCEMAP=false

ADD package.json yarn.lock ./
RUN npm install --silent

COPY . ./
RUN npm run build


FROM nginx:stable-alpine

EXPOSE 80

COPY --from=BUILD /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=BUILD /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
