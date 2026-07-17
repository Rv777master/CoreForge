import { useState } from "react";

const API_URL = "/api/software-requests";

const categories = [
  { key: "editing", emoji: "🎞️", name: "Video Editing", examples: "Premiere, DaVinci, Final Cut" },
  { key: "coding", emoji: "💻", name: "Coding", examples: "VS Code, Docker, Git, IDEs" },
  { key: "photography", emoji: "📷", name: "Photography", examples: "Lightroom, Photoshop, Capture One" },
  { key: "animation", emoji: "🎨", name: "Animation / 3D", examples: "Blender, Maya, After Effects" },
];

function SoftwareInstall() {
  const [selectedCats, setSelectedCats] = useState([]);
  const [form, setForm] = useState({ customerName: "", email: "", description: "" });
  const [status, setStatus] = useState(null);

  const toggleCategory = (key) => {
    setSelectedCats((prev) =>
      prev.includes(key) ? prev.filter((c) => c !== key) : [...prev, key]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.customerName || !form.email) {
      setStatus({ type: "error", msg: "Name and email are required." });
      return;
    }
    if (selectedCats.length === 0) {
      setStatus({ type: "error", msg: "Pick at least one category." });
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, categories: selectedCats }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus({ type: "success", msg: "Request received — we'll reach out to schedule setup." });
      setForm({ customerName: "", email: "", description: "" });
      setSelectedCats([]);
    } catch {
      setStatus({ type: "error", msg: "Couldn't submit — is the backend running?" });
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-label">Software setup</div>
            <h2>What do you use your PC for?</h2>
          </div>
          <p>Select every category that applies. We'll install and configure the right tools.</p>
        </div>

        <div className="category-grid">
          {categories.map((cat) => (
            <div
              key={cat.key}
              className={`category-pill${selectedCats.includes(cat.key) ? " selected" : ""}`}
              onClick={() => toggleCategory(cat.key)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggleCategory(cat.key)}
            >
              <span className="emoji">{cat.emoji}</span>
              <span className="name">{cat.name}</span>
              <div className="examples">{cat.examples}</div>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={{ maxWidth: 480 }}>
          <div className="field">
            <label>Your name</label>
            <input
              value={form.customerName}
              onChange={(e) => setForm({ ...form, customerName: e.target.value })}
              placeholder="Full name"
            />
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com"
            />
          </div>
          <div className="field">
            <label>Anything specific we should know?</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="e.g. I mainly edit 4K YouTube videos and need Premiere + DaVinci Resolve set up with GPU acceleration..."
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit request
          </button>
          {status && <div className={`status-msg ${status.type}`}>{status.msg}</div>}
        </form>
      </div>
    </section>
  );
}

export default SoftwareInstall;
