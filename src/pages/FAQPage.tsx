import { FaDiscord, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function FAQPage() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2,
        background: "rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
      }}
      className="flex flex-col items-center justify-center gap-6 p-8 text-white"
    >
      <h2 className="text-center font-custom text-2xl font-bold tracking-widest sm:text-3xl">
        FAQ
      </h2>

      <div className="flex w-full max-w-sm flex-col gap-4 border-t border-white/20 pt-5">
        <div className="text-center">
          <h3 className="mb-1 font-custom text-sm font-semibold sm:text-base">What is OMNI?</h3>
        </div>

        <div className="flex justify-center pt-2">
          <span className="font-custom text-xs tracking-wider text-white/70 sm:text-sm">
            ONTO MY NEXT IDEA
          </span>
        </div>
      </div>

      <div className="flex w-full max-w-sm flex-col gap-4 border-t border-white/20 pt-5">
        <div className="text-center">
          <h3 className="mb-1 font-custom text-sm font-semibold sm:text-base">
            Where can I find OMNI?
          </h3>
        </div>

        {/* flex-wrap is a safety net — four labelled icons are close to the usable
           width inside the TV bezel on the narrowest phones, so they drop to a
           second row rather than overflowing into the frame. */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 pt-2 sm:gap-6">
          <a
            href="https://discord.gg/aVAwQEaU"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join our Discord"
            className="group flex flex-col items-center gap-1.5 text-white/70 transition-colors hover:text-white"
          >
            <FaDiscord className="text-3xl transition-transform group-hover:scale-110 sm:text-5xl" />
            <span className="font-custom text-[10px] tracking-wider sm:text-xs">DISCORD</span>
          </a>

          <a
            href="https://www.instagram.com/ontomynextidea"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
            className="group flex flex-col items-center gap-1.5 text-white/70 transition-colors hover:text-white"
          >
            <FaInstagram className="text-3xl transition-transform group-hover:scale-110 sm:text-5xl" />
            <span className="font-custom text-[10px] tracking-wider sm:text-xs">INSTAGRAM</span>
          </a>

          <a
            href="https://www.youtube.com/@OmniForever"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Subscribe on YouTube"
            className="group flex flex-col items-center gap-1.5 text-white/70 transition-colors hover:text-white"
          >
            <FaYoutube className="text-3xl transition-transform group-hover:scale-110 sm:text-5xl" />
            <span className="font-custom text-[10px] tracking-wider sm:text-xs">YOUTUBE</span>
          </a>

          <a
            href="https://www.tiktok.com/@ontomynextidea"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on TikTok"
            className="group flex flex-col items-center gap-1.5 text-white/70 transition-colors hover:text-white"
          >
            <FaTiktok className="text-3xl transition-transform group-hover:scale-110 sm:text-5xl" />
            <span className="font-custom text-[10px] tracking-wider sm:text-xs">TIKTOK</span>
          </a>
        </div>
      </div>
    </div>
  );
}
