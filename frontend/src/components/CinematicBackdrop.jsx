import useParallax from "../hooks/useParallax.js";

// Per-page accent tints so each page feels distinct while sharing the
// same 3D scene structure.
const pageThemes = {
  "/": { primary: "#ff8a3d", secondary: "#4fd1c5" },
  "/builder": { primary: "#4fd1c5", secondary: "#ff8a3d" },
  "/software": { primary: "#ff5c8a", secondary: "#4fd1c5" },
  "/prebuilt": { primary: "#c96aff", secondary: "#ff8a3d" },
  "/about": { primary: "#4fd1c5", secondary: "#c96aff" },
};

function CinematicBackdrop({ pathname }) {
  const { x, y } = useParallax();
  const theme = pageThemes[pathname] || pageThemes["/"];

  return (
    <div className="cine-scene" aria-hidden="true">
      {/* Perspective floor — receding grid, like looking down a lit corridor */}
      <div
        className="cine-floor"
        style={{
          "--floor-color": theme.primary,
          transform: `rotateX(78deg) translate(${x * 10}px, ${y * 10}px)`,
        }}
      />

      {/* Parallax depth layers — shapes drift opposite to cursor at different rates */}
      <div
        className="cine-shape cine-shape-1"
        style={{
          background: theme.primary,
          transform: `translate(${x * -30}px, ${y * -20}px)`,
        }}
      />
      <div
        className="cine-shape cine-shape-2"
        style={{
          background: theme.secondary,
          transform: `translate(${x * 45}px, ${y * 30}px)`,
        }}
      />
      <div
        className="cine-shape cine-shape-3"
        style={{
          background: theme.primary,
          transform: `translate(${x * -15}px, ${y * 40}px)`,
        }}
      />

      {/* Vignette to keep edges dark and focus center */}
      <div className="cine-vignette" />
    </div>
  );
}

export default CinematicBackdrop;
