#!/usr/bin/env bash
set -Eeuo pipefail

APP_NAME="${APP_NAME:-portfolio}"
APP_DIR="${APP_DIR:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"
NODE_MIN_MAJOR="${NODE_MIN_MAJOR:-22}"

cd "$APP_DIR"
mkdir -p logs

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed. Install Node.js ${NODE_MIN_MAJOR} LTS first."
  exit 1
fi

NODE_VERSION="$(node -p "process.versions.node")"
NODE_MAJOR="$(node -p "Number(process.versions.node.split('.')[0])")"

echo "Node.js: v${NODE_VERSION}"
if [ "$NODE_MAJOR" -lt "$NODE_MIN_MAJOR" ]; then
  echo "Node.js ${NODE_MIN_MAJOR} LTS or newer is recommended for this deployment."
  exit 1
fi

if ! command -v npm >/dev/null 2>&1; then
  echo "npm is not installed."
  exit 1
fi

echo "Installing dependencies..."
npm install --no-audit --no-fund

echo "Building Next.js production bundle..."
npm run build

if ! command -v pm2 >/dev/null 2>&1; then
  echo "Installing PM2 globally..."
  npm install -g pm2
fi

echo "Starting ${APP_NAME} with PM2..."
pm2 startOrReload ecosystem.config.js --only "$APP_NAME" --update-env
pm2 save

echo
echo "PM2 startup command:"
echo "Run the command printed below with sudo if PM2 asks for it."
pm2 startup systemd -u "$(whoami)" --hp "$HOME"

echo
echo "Deployment finished."
echo "App: ${APP_NAME}"
echo "Port: 3000"
echo "Local health check: curl -I http://127.0.0.1:3000"
