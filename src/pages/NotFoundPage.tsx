import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

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
        404
      </h2>

      <p className="max-w-sm text-center font-custom text-sm text-white/70 sm:text-base">
        This channel doesn&apos;t exist.
      </p>

      <button
        type="button"
        onClick={() => navigate("/home")}
        className="rounded-full border border-white/30 px-6 py-2 font-custom text-xs tracking-wider text-white/80 transition-colors hover:border-white/60 hover:text-white sm:text-sm"
      >
        BACK TO HOME
      </button>
    </div>
  );
}
