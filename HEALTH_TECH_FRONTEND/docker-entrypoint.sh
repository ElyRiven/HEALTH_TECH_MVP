#!/bin/sh
cat > /usr/share/nginx/html/env-config.js << EOF
window._env_ = {
  VITE_API_PROTOCOL: "${VITE_API_PROTOCOL}",
  VITE_API_HOST: "${VITE_API_HOST}",
  VITE_API_PORT: "${VITE_API_PORT}"
};
EOF
exec nginx -g "daemon off;"
