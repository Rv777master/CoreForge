import { useRef } from "react";

/**
 * Wraps a card and tilts it in 3D toward the cursor on hover —
 * a subtle "premium product" effect. Resets smoothly on mouse leave.
 */
function TiltCard({ children, className = "", style = {} }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateX = ((y - midY) / midY) * -6;
    const rotateY = ((x - midX) / midX) * 6;
    node.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0px)";
  };

  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

export default TiltCard;
