#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

# Husky 钩子
if [[ -x "node_modules/.bin/husky" ]]; then
  echo "[prepare] Husky" >&2
  node_modules/.bin/husky
else
  echo "[prepare] 跳过 Vite+：未找到 vp" >&2
fi

# CodeGraph 初始化
if command -v codegraph >/dev/null 2>&1; then
  echo "[prepare] CodeGraph" >&2
  codegraph init --yes
else
  echo "[prepare] 未找到 CodeGraph，跳过" >&2
fi
