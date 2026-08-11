import React from "react";
import { useNavigate } from "react-router-dom";
import useIsMobile from "../hooks/useIsMobile";
import VideoHitboxLayer, { Hitbox } from "../components/ui/VideoHitboxLayer";

// Calibrated against public/videos/HOMEPAGEBG.mp4 (1920x1080, single row layout).
const DESKTOP_VIDEO = { width: 1920, height: 1080 };
const DESKTOP_ZONES = [
  { path: "/store",   label: "Shop",    leftPct: 26, topPct: 40, widthPct: 9.5,  heightPct: 31 },
  { path: "/listen",  label: "Listen",  leftPct: 37, topPct: 40, widthPct: 11.5, heightPct: 31 },
  { path: "/faq",     label: "About",   leftPct: 50, topPct: 40, widthPct: 9.5,  heightPct: 31 },
  { path: "/contact", label: "Contact", leftPct: 61, topPct: 40, widthPct: 12,   heightPct: 31 },
];

// Calibrated against public/videos/HOMEPAGEBG_MOBILE.mp4 (1080x1920, 2x2 grid layout).
const MOBILE_VIDEO = { width: 1080, height: 1920 };
const MOBILE_ZONES = [
  { path: "/store",   label: "Shop",    leftPct: 19, topPct: 33, widthPct: 24, heightPct: 21 },
  { path: "/listen",  label: "Listen",  leftPct: 56, topPct: 33, widthPct: 26, heightPct: 21 },
  { path: "/faq",     label: "About",   leftPct: 19, topPct: 56, widthPct: 25, heightPct: 20 },
  { path: "/contact", label: "Contact", leftPct: 53, topPct: 56, widthPct: 30, heightPct: 20 },
];

export default function HomePage() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const video = isMobile ? MOBILE_VIDEO : DESKTOP_VIDEO;
  const zones = isMobile ? MOBILE_ZONES : DESKTOP_ZONES;

  return (
    <VideoHitboxLayer intrinsicWidth={video.width} intrinsicHeight={video.height}>
      {zones.map((zone) => (
        <Hitbox
          key={zone.path}
          leftPct={zone.leftPct}
          topPct={zone.topPct}
          widthPct={zone.widthPct}
          heightPct={zone.heightPct}
          onClick={() => navigate(zone.path)}
          ariaLabel={zone.label}
        />
      ))}
    </VideoHitboxLayer>
  );
}
