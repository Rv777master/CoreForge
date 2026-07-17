import { useEffect, useState } from "react";

/**
 * Tracks mouse position normalized to -1..1 range (0,0 = center of screen).
 * Used to drive parallax depth effects — multiply by different amounts
 * per layer to fake 3D depth (closer layers move more).
 */
function useParallax() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setPos({ x, y });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return pos;
}

export default useParallax;
