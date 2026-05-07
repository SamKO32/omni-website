import React from "react";
import { useNavigate } from "react-router-dom";
import VideoBackground from "../components/ui/VideoBackground";

export default function GatePage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/home");
  };

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden bg-black">
      <div className="relative h-full w-full text-white">
        <VideoBackground src="/videos/GATEPAGEBG.mp4" poster="/images/posters/GATEPAGEBG_poster.jpg" />

        {/* Click area */}
        <button
          type="button"
          onClick={handleSubmit}
          aria-label="Enter"
          className="
            absolute -translate-x-1/2 -translate-y-1/2
            cursor-pointer
            top-[68dvh] left-[50vw] w-[30vw] h-[9dvh]
            sm:top-[68.5vh] sm:left-[50.5vw] sm:w-[12vw] sm:h-[7vh]
          "
        />
      </div>

    </div>
  );
}
