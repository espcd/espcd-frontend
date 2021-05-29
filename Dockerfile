FROM node:current-alpine as BUILD

WORKDIR /app

ENV \
    PATH=/app/node_modules/.bin:$PATH \
    GENERATE_SOURCEMAP=false

ADD package.json yarn.lock ./
RUN npm install --silent

COPY . ./

ARG REACT_APP_BACKEND_SECURE=false
ARG REACT_APP_BACKEND_HOST=localhost
ARG REACT_APP_BACKEND_PORT=3000

ENV REACT_APP_BACKEND_SECURE=$REACT_APP_BACKEND_SECURE \
    REACT_APP_BACKEND_HOST=$REACT_APP_BACKEND_HOST \
    REACT_APP_BACKEND_PORT=$REACT_APP_BACKEND_PORT

RUN npm run build


FROM nginx:stable-alpine

EXPOSE 80

COPY --from=BUILD /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=BUILD /app/build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
