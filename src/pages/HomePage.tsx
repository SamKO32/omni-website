import React from "react";
import { useNavigate } from "react-router-dom";
import VideoBackground from "../components/ui/VideoBackground";

export default function HomePage() {
  const navigate = useNavigate();

  const handleSubmit = (path: string) => {
    navigate(path);
  };

  return (
    <div className="relative w-screen h-[100dvh] overflow-hidden bg-black">
      <div className="relative h-full w-full text-white">
        <VideoBackground src="/videos/HOMEPAGEBG.mp4" poster="/images/posters/HOMEPAGEBG_poster.jpg" />

        {/* Back to start */}
        <div
          onClick={() => handleSubmit("/")}
          className="absolute"
          style={{
            top: "4vh",
            left: "50vw",
            width: "9.5vw",
            height: "7vh",
            borderRadius: "70px",
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
          }}
        />

        {/* Store clickable areas */}
        {/* Icon */}
        <button
          type="button"
          onClick={() => handleSubmit("/store")}
          aria-label="Enter"
          className="
            absolute -translate-x-1/2 -translate-y-1/2
            cursor-pointer
            top-[50dvh] left-[31.5vw] w-[11vw] h-[18dvh]
            sm:top-[50vh] sm:left-[31.5vw] sm:w-[11vw] sm:h-[20vh]
          "
        />
        {/* Label */}
        <button
          type="button"
          onClick={() => handleSubmit("/store")}
          aria-label="Enter"
          className="
            absolute -translate-x-1/2 -translate-y-1/2
            cursor-pointer
            top-[68dvh] left-[32vw] w-[10vw] h-[9dvh]
            sm:top-[68.5vh] sm:left-[31.5vw] sm:w-[8vw] sm:h-[7vh]
          "
        />

        {/* Listen clickable areas */}
        {/* Icon */}
        <button
          type="button"
          onClick={() => handleSubmit("/listen")}
          aria-label="Enter"
          className="
            absolute -translate-x-1/2 -translate-y-1/2
            cursor-pointer
            top-[50dvh] left-[43.5vw] w-[11vw] h-[18dvh]
            sm:top-[50vh] sm:left-[43.5vw] sm:w-[11vw] sm:h-[20vh]
          "
        />
        {/* Label */}
        <button
          type="button"
          onClick={() => handleSubmit("/listen")}
          aria-label="Enter"
          className="
            absolute -translate-x-1/2 -translate-y-1/2
            cursor-pointer
            top-[68dvh] left-[43vw] w-[11vw] h-[9dvh]
            sm:top-[68.5vh] sm:left-[43vw] sm:w-[11vw] sm:h-[7vh]
          "
        />

        {/* FAQ clickable areas */}
        {/* Icon */}
        <button
          type="button"
          onClick={() => handleSubmit("/faq")}
          aria-label="Enter"
          className="
            absolute -translate-x-1/2 -translate-y-1/2
            cursor-pointer
            top-[50dvh] left-[55vw] w-[11vw] h-[18dvh]
            sm:top-[50vh] sm:left-[55.5vw] sm:w-[11vw] sm:h-[20vh]
          "
        />
        {/* Label */}
        <button
          type="button"
          onClick={() => handleSubmit("/faq")}
          aria-label="Enter"
          className="
            absolute -translate-x-1/2 -translate-y-1/2
            cursor-pointer
            top-[68dvh] left-[55vw] w-[10vw] h-[9dvh]
            sm:top-[68.5vh] sm:left-[55vw] sm:w-[11vw] sm:h-[7vh]
          "
        />

        {/* Contact clickable areas */}
        {/* Icon */}
        <button
          type="button"
          onClick={() => handleSubmit("/contact")}
          aria-label="Enter"
          className="
            absolute -translate-x-1/2 -translate-y-1/2
            cursor-pointer
            top-[50dvh] left-[67.5vw] w-[11vw] h-[18dvh]
            sm:top-[50vh] sm:left-[67.5vw] sm:w-[11vw] sm:h-[20vh]
          "
        />
        {/* Label */}
        <button
          type="button"
          onClick={() => handleSubmit("/contact")}
          aria-label="Enter"
          className="
            absolute -translate-x-1/2 -translate-y-1/2
            cursor-pointer
            top-[68dvh] left-[67.5vw] w-[13vw] h-[9dvh]
            sm:top-[68.5vh] sm:left-[67.5vw] sm:w-[13vw] sm:h-[7vh]
          "
        />
      </div>
    
    </div>
  );
}
