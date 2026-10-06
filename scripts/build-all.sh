#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"

echo "→ Cleaning dist/"
rm -rf "$DIST"
mkdir -p "$DIST/demos"

build_demo() {
  local id="$1"
  local slug="$2"
  echo "  • project $id → demos/$slug"
  (
    cd "$ROOT/projects/$id"
    DEMO_SLUG="$slug" npm run build
    rm -rf "$DIST/demos/$slug"
    cp -R out "$DIST/demos/$slug"
  )
}

echo "→ Building demo projects with basePath..."
build_demo 1 enjoygamesnow
build_demo 2 meilleurs-jeuxx
build_demo 3 astrareels
build_demo 4 pixelspowershop

echo "→ Sanitizing demo contacts (sources)..."
node "$ROOT/scripts/sanitize-demo-contacts.mjs" | grep -E '^project|^done' || true

echo "→ Removing visible contact blocks (vanilla demos)..."
node "$ROOT/scripts/remove-demo-contacts.mjs" | grep -E '^project|^done' || true

echo "→ Copying vanilla JS demos with fixed paths..."
node "$ROOT/scripts/copy-vanilla-demo.mjs"

echo "→ Generating English resume DOCX..."
if [ -x "$ROOT/.venv-resume/bin/python3" ]; then
  "$ROOT/.venv-resume/bin/python3" "$ROOT/scripts/generate-resume-en-docx.py"
else
  python3 "$ROOT/scripts/generate-resume-en-docx.py" 2>/dev/null || echo "  (skip: run .venv-resume setup for EN resume)"
fi

echo "→ Building portfolio..."
(
  cd "$ROOT"
  npm run build
  cp -R out-portfolio/. "$DIST/"
  rm -rf "$ROOT/out-portfolio"
)

echo "→ Adding hosting config (.htaccess)..."
cp "$ROOT/scripts/hosting/.htaccess" "$DIST/.htaccess"

echo "→ Sanitizing built demos in dist/..."
node "$ROOT/scripts/sanitize-demo-contacts.mjs" | grep -E '^dist|^done' || true

echo "✓ Ready: $DIST"
echo "  Run: npm run serve"
