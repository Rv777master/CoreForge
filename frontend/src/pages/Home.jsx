import { useRef } from "react";
import { Link } from "react-router-dom";
import AnimatedHeadline from "../components/AnimatedHeadline.jsx";
import Reveal from "../components/Reveal.jsx";
import TiltCard from "../components/TiltCard.jsx";

const services = [
  {
    title: "Custom PC Build",
    desc: "Pick every part yourself — CPU, GPU, RAM, cooling — and watch your build ticket total up live.",
    link: "/builder",
    linkText: "Start building →",
  },
  {
    title: "Software Setup",
    desc: "Tell us what you use your PC for — editing, coding, photography, animation — we install and configure it.",
    link: "/software",
    linkText: "Request setup →",
  },
  {
    title: "Prebuilt PCs",
    desc: "Skip the build — pick a ready-to-ship machine tuned for gaming, creative work, or everyday use.",
    link: "/prebuilt",
    linkText: "Browse builds →",
  },
];

function Home() {
  const heroRef = useRef(null);
  const spotlightRef = useRef(null);

  const handleHeroMove = (e) => {
    const hero = heroRef.current;
    const spotlight = spotlightRef.current;
    if (!hero || !spotlight) return;
    const rect = hero.getBoundingClientRect();
    spotlight.style.left = `${e.clientX - rect.left}px`;
    spotlight.style.top = `${e.clientY - rect.top}px`;
  };

  return (
    <>
      <section className="hero" ref={heroRef} onMouseMove={handleHeroMove}>
        <div className="hero-rgb-glow" aria-hidden="true">
          <span className="rgb-1" />
          <span className="rgb-2" />
          <span className="rgb-3" />
        </div>
        <div className="light-streaks" aria-hidden="true">
          <span className="streak-1" />
          <span className="streak-2" />
          <span className="streak-3" />
        </div>
        <div className="hero-spotlight" ref={spotlightRef} aria-hidden="true" />
        <div className="container">
          <div className="eyebrow">Custom builds · Repairs · Upgrades</div>
          <AnimatedHeadline
            text="Every part chosen on purpose."
            highlight="Every build, on the ticket."
          />
          <p>
            CoreForge builds and repairs PCs the way a proper shop should — real branded components,
            a transparent build ticket that updates as you choose parts, and a team that stands
            behind what it assembles.
          </p>
          <div className="hero-actions">
            <Link to="/builder" className="btn btn-primary">
              Build my PC
            </Link>
            <Link to="/prebuilt" className="btn btn-outline">
              See prebuilt options
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <div>
                <div className="section-label">What we do</div>
                <h2>Three ways to work with us</h2>
              </div>
              <p>Whether you know exactly what you want or need us to recommend it — we've got a path for you.</p>
            </div>
          </Reveal>
          <div className="service-grid">
            {services.map((s, i) => (
              <Reveal delay={i * 120} key={s.title}>
                <TiltCard className="service-card">
                  <div className="index">0{i + 1}</div>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                  <Link to={s.link}>{s.linkText}</Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
