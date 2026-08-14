import { FaDiscord, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';

export default function FAQPage() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2,
        background: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
      className="text-white flex flex-col items-center justify-center gap-6 p-8"
    >
      <h2 className="font-custom font-bold text-2xl sm:text-3xl text-center tracking-widest">
        FAQ
      </h2>

      <div className="w-full max-w-sm border-t border-white/20 pt-5 flex flex-col gap-4">
        <div className="text-center">
          <h3 className="font-custom font-semibold text-sm sm:text-base mb-1">
            What is OMNI?
          </h3>
        </div>

        <div className="flex justify-center pt-2">
          <span className="font-custom text-xs sm:text-sm tracking-wider text-white/70">
            ONTO MY NEXT IDEA
          </span>
        </div>
      </div>

      <div className="w-full max-w-sm border-t border-white/20 pt-5 flex flex-col gap-4">
        <div className="text-center">
          <h3 className="font-custom font-semibold text-sm sm:text-base mb-1">
            Where can I find OMNI?
          </h3>
        </div>

        {/* flex-wrap is a safety net — four labelled icons are close to the usable
           width inside the TV bezel on the narrowest phones, so they drop to a
           second row rather than overflowing into the frame. */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-3 sm:gap-6 pt-2">
          <a
            href="https://discord.gg/aVAwQEaU"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join our Discord"
            className="flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors group"
          >
            <FaDiscord className="text-3xl sm:text-5xl group-hover:scale-110 transition-transform" />
            <span className="font-custom text-[10px] sm:text-xs tracking-wider">DISCORD</span>
          </a>

          <a
            href="https://www.instagram.com/ontomynextidea"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on Instagram"
            className="flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors group"
          >
            <FaInstagram className="text-3xl sm:text-5xl group-hover:scale-110 transition-transform" />
            <span className="font-custom text-[10px] sm:text-xs tracking-wider">INSTAGRAM</span>
          </a>

          <a
            href="https://www.youtube.com/@OmniForever"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Subscribe on YouTube"
            className="flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors group"
          >
            <FaYoutube className="text-3xl sm:text-5xl group-hover:scale-110 transition-transform" />
            <span className="font-custom text-[10px] sm:text-xs tracking-wider">YOUTUBE</span>
          </a>

          <a
            href="https://www.tiktok.com/@ontomynextidea"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow us on TikTok"
            className="flex flex-col items-center gap-1.5 text-white/70 hover:text-white transition-colors group"
          >
            <FaTiktok className="text-3xl sm:text-5xl group-hover:scale-110 transition-transform" />
            <span className="font-custom text-[10px] sm:text-xs tracking-wider">TIKTOK</span>
          </a>
        </div>
      </div>
    </div>
  );
}
