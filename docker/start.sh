#!/usr/bin/env bash
set -e

echo "Install dependency"
# Build frontend
cd /frontend
npm install
npm run build
# Start Backend
cd /code
npm install

echo "Starting Backend Services for env: ${ENV} ${DEBUG}"
if [[ ${ENV} == "production" ]]; then
  source .{ENV}_env
  npm run build
  /usr/local/bin/circusd /docker/circus_prod.ini
fi

if [[ ${ENV} == "development" ]]; then
  if [[ ${DEBUG} == true ]]; then
    /usr/local/bin/circusd /docker/circus_debug.ini
  else
    /usr/local/bin/circusd /docker/circus_dev.ini
  fi
fi
# Default
/usr/local/bin/circusd /docker/circus_local.ini