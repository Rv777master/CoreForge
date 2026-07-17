import { useEffect, useState } from "react";
import { retailers, serviceCenters, corporateSupply } from "../data/network.js";
import PCIllustration from "../components/PCIllustration.jsx";
import Reveal from "../components/Reveal.jsx";
import TiltCard from "../components/TiltCard.jsx";

const API_URL = "/api/prebuilt";

function PrebuiltPCs() {
  const [pcs, setPcs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buyMsg, setBuyMsg] = useState(null);
  const [buyTarget, setBuyTarget] = useState(null); // which PC is being bought
  const [buyerInfo, setBuyerInfo] = useState({ name: "", email: "", phone: "" });
  
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then(setPcs)
      .catch(() => setPcs([]))
      .finally(() => setLoading(false));
  }, []);

  const openBuyModal = (pc) => {
  setBuyTarget(pc);
  setBuyerInfo({ name: "", email: "", phone: "" });
};

const submitBuy = async () => {
  if (!buyerInfo.name || !buyerInfo.email || !buyerInfo.phone) {
    setBuyMsg("Please fill in your name, email, and phone.");
    setTimeout(() => setBuyMsg(null), 4000);
    return;
  }

  const pc = buyTarget;
  try {
    const res = await fetch("/api/builds", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: buyerInfo.name,
        email: buyerInfo.email,
        phone: buyerInfo.phone,
        components: {
          cpu: pc.specs?.cpu || "-",
          gpu: pc.specs?.gpu || "-",
          motherboard: "-",
          ram: pc.specs?.ram || "-",
          storage: pc.specs?.storage || "-",
          cooling: "-",
          psu: "-",
          pcCase: "-",
        },
        estimatedTotal: pc.price,
        notes: `Prebuilt purchase request: ${pc.name}`,
      }),
    });
    if (!res.ok) throw new Error("Request failed");
    setBuyMsg(`Request sent for ${pc.name} — our team will contact you to confirm.`);
  } catch {
    setBuyMsg("Something went wrong — please try again.");
  }
  setBuyTarget(null);
  setTimeout(() => setBuyMsg(null), 4000);
};

  return (
    <section className="section">
      <div className="container">
        <Reveal>
          <div className="section-head">
            <div>
              <div className="section-label">Ready to ship</div>
              <h2>Prebuilt machines</h2>
            </div>
            <p>Skip the build — every machine below is assembled, tested, and ready to go.</p>
          </div>
        </Reveal>

        {loading ? (
          <p>Loading catalog...</p>
        ) : pcs.length === 0 ? (
          <p style={{ color: "var(--text-dim)" }}>
            No prebuilt PCs loaded yet — run the backend seed script (<code>npm run seed</code>) to populate the catalog.
          </p>
        ) : (
          <div className="prebuilt-grid">
            {pcs.map((pc, i) => (
              <Reveal delay={i * 100} key={pc._id}>
                <TiltCard className="prebuilt-card">
                  <div className="prebuilt-image">
                    {pc.image ? (
                      <img src={pc.image} alt={pc.name} loading="lazy" />
                    ) : (
                      <PCIllustration tier={pc.tier} />
                    )}
                  </div>
                  <div className="prebuilt-tier">{pc.tier}</div>
                  <h3>{pc.name}</h3>
                  <div className="tagline">{pc.tagline}</div>
                  {pc.description && <p className="prebuilt-desc">{pc.description}</p>}
                  <div className="prebuilt-specs">
                    <div>
                      <span>CPU</span>
                      <span className="val">{pc.specs.cpu}</span>
                    </div>
                    <div>
                      <span>GPU</span>
                      <span className="val">{pc.specs.gpu}</span>
                    </div>
                    <div>
                      <span>RAM</span>
                      <span className="val">{pc.specs.ram}</span>
                    </div>
                    <div>
                      <span>Storage</span>
                      <span className="val">{pc.specs.storage}</span>
                    </div>
                  </div>
                  <div className="prebuilt-footer">
                    <span className="price">₹{pc.price.toLocaleString("en-IN")}</span>
                    <button className="btn btn-outline" onClick={() => openBuyModal(pc)}>
                      Buy now
                    </button>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        )}
        {buyMsg && <div className="status-msg success" style={{ marginTop: 16 }}>{buyMsg}</div>}

        {/* ---------- Retail Partners ---------- */}
        <Reveal>
          <div className="section-head" style={{ marginTop: 72 }}>
            <div>
              <div className="section-label">Our network</div>
              <h2>Retail partners</h2>
            </div>
            <p>Authorized resellers carrying our prebuilt line and components in-store.</p>
          </div>
        </Reveal>
        <div className="retailer-grid">
          {retailers.map((r, i) => (
            <Reveal delay={i * 100} key={r.name}>
              <TiltCard className="retailer-card">
                <div className="retailer-image">
                  <img src={r.image} alt={r.name} loading="lazy" />
                </div>
                <div className="retailer-body">
                  <h4>{r.name}</h4>
                  <div className="retailer-meta">
                    <span>📍 {r.city}</span>
                    <span>📞 {r.contact}</span>
                  </div>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        {/* ---------- Service Centers ---------- */}
        <Reveal>
          <div className="section-head" style={{ marginTop: 64 }}>
            <div>
              <div className="section-label">Warranty support</div>
              <h2>Service centers</h2>
            </div>
            <p>Partner repair centers for warranty support outside our home workshop.</p>
          </div>
        </Reveal>
        <Reveal>
          <div className="service-list">
            {serviceCenters.map((s) => (
              <div className="service-item" key={s.name}>
                <div>
                  <div className="name">{s.name}</div>
                  <div className="city">{s.city}</div>
                </div>
                <div className="contact">{s.contact}</div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ---------- Corporate Supply ---------- */}
        <Reveal>
          <div className="corporate-box">
            <div>
              <div className="section-label">Corporate supply</div>
              <h2>{corporateSupply.headline}</h2>
              <p>{corporateSupply.description}</p>
            </div>
            <div className="corporate-stats">
              {corporateSupply.stats.map((stat) => (
                <div key={stat.label} className="stat">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
      {buyTarget && (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
          }}>
            <div style={{
              background: "var(--bg-panel, #1a1a2e)", padding: 24, borderRadius: 12,
              width: 320, display: "flex", flexDirection: "column", gap: 12
            }}>
              <h3 style={{ margin: 0 }}>Buy {buyTarget.name}</h3>
              <input
                placeholder="Your name"
                value={buyerInfo.name}
                onChange={(e) => setBuyerInfo({ ...buyerInfo, name: e.target.value })}
              />
              <input
                placeholder="Email"
                value={buyerInfo.email}
                onChange={(e) => setBuyerInfo({ ...buyerInfo, email: e.target.value })}
              />
              <input
                placeholder="Phone"
                value={buyerInfo.phone}
                onChange={(e) => setBuyerInfo({ ...buyerInfo, phone: e.target.value })}
              />
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button className="btn btn-outline" onClick={() => setBuyTarget(null)}>Cancel</button>
                <button className="btn" onClick={submitBuy}>Confirm</button>
              </div>
            </div>
          </div>
        )}
    </section>
  );
}

export default PrebuiltPCs;
