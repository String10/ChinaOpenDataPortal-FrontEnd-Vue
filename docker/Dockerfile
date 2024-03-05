# build stage
FROM node:lts-alpine as build-stage
COPY ./ /app
WORKDIR /app
RUN npm install
ARG VITE_BACKEND_HOST=VITE_BACKEND_HOST_PLACEHOLDER
RUN set -x; npm run build \
    && cp src/assets/logo-websoft.png dist/assets

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /app
ARG POSTPROCESSING_SCRIPT=rewrite-env-vars.sh
COPY docker/${POSTPROCESSING_SCRIPT} /docker-entrypoint.d/${POSTPROCESSING_SCRIPT}
RUN chmod +x /docker-entrypoint.d/${POSTPROCESSING_SCRIPT}
COPY docker/nginx.conf /etc/nginx/nginx.conf