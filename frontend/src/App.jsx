import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CinematicBackdrop from "./components/CinematicBackdrop.jsx";
import Home from "./pages/Home.jsx";
import PCBuilder from "./pages/PCBuilder.jsx";
import SoftwareInstall from "./pages/SoftwareInstall.jsx";
import PrebuiltPCs from "./pages/PrebuiltPCs.jsx";
import About from "./pages/About.jsx";
import Admin from "./pages/Admin.jsx";

function App() {
  const location = useLocation();

  return (
    <>
      <CinematicBackdrop pathname={location.pathname} />
      <Navbar />
      {/* key={pathname} forces this div to remount on every page change,
          which replays the .page-fade entrance animation each time. */}
      <div key={location.pathname} className="page-fade">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/builder" element={<PCBuilder />} />
          <Route path="/software" element={<SoftwareInstall />} />
          <Route path="/prebuilt" element={<PrebuiltPCs />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
