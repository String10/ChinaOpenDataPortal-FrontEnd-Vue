#!/bin/sh

ROOT_DIR=/app

# Replace env vars in files served by NGINX
for file in ${ROOT_DIR}/index.html ${ROOT_DIR}/assets/*.js;
do
  sed -i 's|VITE_BACKEND_HOST_PLACEHOLDER|'${VITE_BACKEND_HOST}'|g' $file
done

# Let container execution proceed
exec "$@"
