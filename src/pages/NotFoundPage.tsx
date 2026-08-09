import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

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
        404
      </h2>

      <p className="font-custom text-sm sm:text-base text-white/70 text-center max-w-sm">
        This channel doesn&apos;t exist.
      </p>

      <button
        type="button"
        onClick={() => navigate('/home')}
        className="font-custom text-xs sm:text-sm tracking-wider border border-white/30 rounded-full px-6 py-2 text-white/80 hover:text-white hover:border-white/60 transition-colors"
      >
        BACK TO HOME
      </button>
    </div>
  );
}
