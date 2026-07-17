import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer container">
      <span>© {new Date().getFullYear()} CoreForge Builds</span>
      <Link to="/admin" className="admin-link">
        Admin
      </Link>
    </footer>
  );
}

export default Footer;
