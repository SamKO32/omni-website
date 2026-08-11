import { useEffect, useState } from 'react';

// Matches the project's `sm:` Tailwind breakpoint (640px) used elsewhere to split mobile/desktop layouts.
const QUERY = '(max-width: 639px)';

export default function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(QUERY).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const handleChange = () => setIsMobile(mql.matches);
    handleChange();
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  return isMobile;
}
