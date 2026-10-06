#!/usr/bin/env bash
# Portfolio dev server + static server for the built demos.
# Demos only exist in dist/demos (made by `npm run build:all`); next dev cannot
# serve them, so they are served from dist on DEMOS_PORT and the project cards
# link there via NEXT_PUBLIC_DEMOS_ORIGIN.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEMOS_PORT="${DEMOS_PORT:-3001}"

if [ -d "$ROOT/dist/demos" ]; then
  npx --yes serve "$ROOT/dist" -l "$DEMOS_PORT" --no-port-switching >/dev/null 2>&1 &
  SERVE_PID=$!
  trap 'kill "$SERVE_PID" 2>/dev/null || true' EXIT INT TERM
  echo "→ Demos: http://localhost:$DEMOS_PORT/demos/"
  export NEXT_PUBLIC_DEMOS_ORIGIN="http://localhost:$DEMOS_PORT"
else
  echo "→ dist/demos not found: run \`npm run build:all\` once to open demos in dev"
fi

cd "$ROOT"
NEXT_DIST_DIR=.next-dev npx next dev "$@"
