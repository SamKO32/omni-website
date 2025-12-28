import React from "react";
import { useNavigate } from "react-router-dom";

export default function GatePage() {
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/home");
  };

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden bg-black">
      <div className="relative h-full w-full text-white">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full pointer-events-none"
          style={{ objectFit: "fill" }}
        >
          <source src="/videos/GATEPAGEBG.mov" type="video/mp4" />
        </video>

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
