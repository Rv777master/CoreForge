import { useState, useRef } from "react";

const API_URL = "/api/contact";

function About() {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Read straight from the DOM instead of React state — this avoids a
    // known browser quirk where autofilled fields don't always trigger
    // React's onChange, which can leave state out of sync with what's
    // visibly typed in the field.
    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const message = messageRef.current.value.trim();

    if (!name || !email || !message) {
      setStatus({ type: "error", msg: "Please fill in all fields." });
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus({ type: "success", msg: "Message sent — we'll get back to you soon." });
      nameRef.current.value = "";
      emailRef.current.value = "";
      messageRef.current.value = "";
    } catch {
      setStatus({ type: "error", msg: "Couldn't send — is the backend running?" });
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-label">About us</div>
            <h2>Built by people who actually build PCs</h2>
          </div>
        </div>

        <div className="about-grid">
          <div>
            <p style={{ color: "var(--text-dim)", maxWidth: 460 }}>
              CoreForge started as a small repair bench fixing laptops and desktops for
              neighbors. Today we build custom machines to spec, repair and upgrade
              existing systems, and set up software for creators, coders, and studios —
              all with the same shop-floor transparency we started with: you see exactly
              what's going into your machine and what it costs.
            </p>

            <div className="contact-list">
              <div className="contact-item">
                <div className="label">Email</div>
                <div className="value">rudreshvyas777@gmail.com</div>
              </div>
              <div className="contact-item">
                <div className="label">Phone</div>
                <div className="value">+91 98765 43210</div>
              </div>
              <div className="contact-item">
                <div className="label">Support hours</div>
                <div className="value">Mon–Sat, 10:00–19:00</div>
              </div>
              <div className="contact-item">
                <div className="label">Workshop address</div>
                <div className="value">CoreForge Build Bench, Rajkot, Gujarat, India</div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Name</label>
              <input ref={nameRef} name="name" placeholder="Your name" />
            </div>
            <div className="field">
              <label>Email</label>
              <input ref={emailRef} type="email" name="email" placeholder="you@example.com" />
            </div>
            <div className="field">
              <label>Message</label>
              <textarea ref={messageRef} name="message" placeholder="How can we help?" />
            </div>
            <button type="submit" className="btn btn-primary">
              Send message
            </button>
            {status && <div className={`status-msg ${status.type}`}>{status.msg}</div>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default About;
