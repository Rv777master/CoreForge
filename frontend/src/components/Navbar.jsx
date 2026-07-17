import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <div className="container">
        <NavLink to="/" className="brand">
          <span className="dot" />
          CoreForge
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/builder" className={({ isActive }) => (isActive ? "active" : "")}>
            PC Builder
          </NavLink>
          <NavLink to="/software" className={({ isActive }) => (isActive ? "active" : "")}>
            Software Setup
          </NavLink>
          <NavLink to="/prebuilt" className={({ isActive }) => (isActive ? "active" : "")}>
            Prebuilt PCs
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
