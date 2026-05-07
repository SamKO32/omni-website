#!/usr/bin/env bash
# optimize-assets.sh
# Converts .mov videos → H.264 .mp4 and render PNGs → WebP.
# Run once after installing ffmpeg and webp:
#   brew install ffmpeg webp
#   chmod +x optimize-assets.sh && ./optimize-assets.sh

set -e

VIDEOS_DIR="public/videos"
IMAGES_DIR="public/images/products"
POSTERS_DIR="public/images/posters"

# ── Preflight ──────────────────────────────────────────────────────────────────
if ! command -v ffmpeg &>/dev/null; then
  echo "❌  ffmpeg not found. Run: brew install ffmpeg"
  exit 1
fi
if ! command -v cwebp &>/dev/null; then
  echo "❌  cwebp not found. Run: brew install webp"
  exit 1
fi

mkdir -p "$POSTERS_DIR"

# ── Videos ────────────────────────────────────────────────────────────────────
# -crf 26          quality (18=best, 28=good enough for bg video)
# -preset veryslow best compression ratio at cost of encode time
# -an              strip audio (all bg videos are muted anyway)
# -movflags faststart  puts metadata at file start → playback begins before full download
echo "Converting videos..."

convert_video() {
  local input="$1"
  local output="${input%.mov}.mp4"
  local poster="${POSTERS_DIR}/$(basename "${input%.mov}")_poster.jpg"

  if [ ! -f "$input" ]; then
    echo "  ⚠️  Skipping $input (not found)"
    return
  fi

  echo "  ▶  $input → $output"
  ffmpeg -y -i "$input" \
    -c:v libx264 -crf 26 -preset veryslow \
    -an \
    -movflags faststart \
    "$output"

  echo "  🖼  Extracting poster frame → $poster"
  ffmpeg -y -i "$output" -vframes 1 -q:v 3 "$poster"

  local before after
  before=$(du -sh "$input" | cut -f1)
  after=$(du -sh "$output" | cut -f1)
  echo "     $before → $after"
}

convert_video "$VIDEOS_DIR/GATEPAGEBG.mov"
convert_video "$VIDEOS_DIR/HOMEPAGEBG.mov"
convert_video "$VIDEOS_DIR/LISTENPAGEBG.mov"
convert_video "$VIDEOS_DIR/bgspace.mov"

# ── Images ────────────────────────────────────────────────────────────────────
echo ""
echo "Converting product render images to WebP..."

convert_image() {
  local input="$1"
  local output="${input%.png}.webp"

  if [ ! -f "$input" ]; then
    echo "  ⚠️  Skipping $input (not found)"
    return
  fi

  echo "  ▶  $input → $output"
  cwebp -q 82 "$input" -o "$output"

  local before after
  before=$(du -sh "$input" | cut -f1)
  after=$(du -sh "$output" | cut -f1)
  echo "     $before → $after"
}

convert_image "$IMAGES_DIR/psp_render.png"
convert_image "$IMAGES_DIR/tf_render_f.png"
convert_image "$IMAGES_DIR/tf_render_b.png"

# ── Post-conversion instructions ──────────────────────────────────────────────
echo ""
echo "✅  Done! Now apply these changes to the codebase:"
echo ""
echo "1. src/data/products.tsx — update image paths:"
echo "   psp_render.png  →  psp_render.webp"
echo "   tf_render_f.png →  tf_render_f.webp"
echo "   tf_render_b.png →  tf_render_b.webp"
echo ""
echo "2. src/pages/GatePage.tsx — update video src and add poster:"
echo "   src=\"/videos/GATEPAGEBG.mov\"  →  src=\"/videos/GATEPAGEBG.mp4\""
echo "   poster=\"/images/posters/GATEPAGEBG_poster.jpg\""
echo ""
echo "3. src/pages/HomePage.tsx — update video src and add poster:"
echo "   src=\"/videos/HOMEPAGEBG.mov\"  →  src=\"/videos/HOMEPAGEBG.mp4\""
echo "   poster=\"/images/posters/HOMEPAGEBG_poster.jpg\""
echo ""
echo "4. src/pages/ListenPage.tsx — update video src and add poster:"
echo "   src=\"/videos/LISTENPAGEBG.mov\"  →  src=\"/videos/LISTENPAGEBG.mp4\""
echo "   poster=\"/images/posters/LISTENPAGEBG_poster.jpg\""
echo ""
echo "5. src/pages/ContactPage.tsx — update video src and add poster:"
echo "   src=\"/videos/bgspace.mov\"  →  src=\"/videos/bgspace.mp4\""
echo "   poster=\"/images/posters/bgspace_poster.jpg\""
echo ""
echo "6. index.html — update the preload hint:"
echo "   href=\"/videos/GATEPAGEBG.mov\"  →  href=\"/videos/GATEPAGEBG.mp4\""
echo ""
echo "Once confirmed working, you can delete the original .mov files to reclaim ~300MB."
