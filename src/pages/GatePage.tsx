import React from "react";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";
import VideoHitboxLayer, { Hitbox } from "../components/ui/VideoHitboxLayer";

// Calibrated against public/videos/GATEPAGEBG.mp4 (1920x1080) — same video plays on
// mobile and desktop, so a single zone set covers both. Percentages are relative to
// the video's own frame, so they hold regardless of whether the frame is rendered
// cropped (desktop, object-cover) or stretched (mobile, object-fill — see App.tsx).
const VIDEO = { width: 1920, height: 1080 };
const ENTER_ZONE = { leftPct: 43, topPct: 65, widthPct: 14, heightPct: 7 };

export default function GatePage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  return (
    <VideoHitboxLayer
      intrinsicWidth={VIDEO.width}
      intrinsicHeight={VIDEO.height}
      fit={isMobile ? "fill" : "cover"}
    >
      <Hitbox
        leftPct={ENTER_ZONE.leftPct}
        topPct={ENTER_ZONE.topPct}
        widthPct={ENTER_ZONE.widthPct}
        heightPct={ENTER_ZONE.heightPct}
        onClick={() => navigate("/home")}
        ariaLabel="Enter"
      />
    </VideoHitboxLayer>
  );
}
