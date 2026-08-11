#!/usr/bin/env bash
# Kills any leftover Vite dev-server processes for this project (running,
# sleeping, or stopped/suspended via Ctrl+Z) so a fresh `make start` never
# hangs behind a zombie holding an old port.
set -euo pipefail

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
VITE_BIN="$PROJECT_ROOT/node_modules/.bin/vite"

# Match only vite processes launched from *this* project's node_modules,
# so other projects' dev servers on the machine are left alone.
# (bash 3.2 on macOS has no mapfile, so build the list the old way)
VITE_PIDS=$(pgrep -f "$VITE_BIN" || true)

if [ -z "$VITE_PIDS" ]; then
  echo "kill-dev: no stale Vite processes found for this project."
else
  ALL_PIDS="$VITE_PIDS"
  for pid in $VITE_PIDS; do
    ppid=$(ps -o ppid= -p "$pid" 2>/dev/null | tr -d ' ' || true)
    if [ -n "$ppid" ] && [ "$ppid" != "1" ]; then
      ALL_PIDS="$ALL_PIDS $ppid"
    fi
  done

  # Dedupe
  UNIQUE_PIDS=$(printf "%s\n" $ALL_PIDS | sort -un | tr '\n' ' ')

  echo "kill-dev: found stale dev-server processes, killing:"
  ps -o pid,etime,state,command -p $UNIQUE_PIDS 2>/dev/null || true

  # SIGKILL directly: some of these are stopped/suspended (Ctrl+Z), and a
  # stopped process won't act on SIGTERM until resumed, so KILL is the only
  # signal guaranteed to reap them immediately.
  kill -9 $UNIQUE_PIDS 2>/dev/null || true
  echo "kill-dev: done."
fi

# Safety net: warn (don't kill) about anything still listening on Vite's
# default port range that this pass didn't account for, e.g. a differently
# invoked dev server. Surfacing it beats silently colliding with it later.
STRAY=$(lsof -iTCP -sTCP:LISTEN -P -n 2>/dev/null | awk '$9 ~ /:517[3-9]$/ {print}')
if [ -n "$STRAY" ]; then
  echo ""
  echo "kill-dev: warning — something is still listening on 5173-5179:"
  echo "$STRAY"
  echo "If this isn't yours, investigate before starting the dev server."
fi
