import { useEffect, useState } from "react";

const API_BASE =  "/api"

const tabs = [
  { key: "builds", label: "Build Orders", url: `${API_BASE}/builds` },
  { key: "software", label: "Software Requests", url: `${API_BASE}/software-requests` },
  { key: "contact", label: "Contact Messages", url: `${API_BASE}/contact` },
];

function Admin() {
  const [activeTab, setActiveTab] = useState("builds");
  const [data, setData] = useState({ builds: [], software: [], contact: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(tabs.map((t) => fetch(t.url).then((r) => r.json())))
      .then(([builds, software, contact]) => {
        setData({ builds, software, contact });
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const items = data[activeTab] || [];

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-label">Owner view</div>
            <h2>Admin — Incoming requests</h2>
          </div>
          <p>Everything customers have submitted through the site, in one place.</p>
        </div>

        <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`btn ${activeTab === t.key ? "btn-primary" : "btn-outline"}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label} ({data[t.key]?.length || 0})
            </button>
          ))}
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : items.length === 0 ? (
          <p style={{ color: "var(--text-dim)" }}>No entries yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {items.map((item) => (
              <div key={item._id} className="admin-card">
                {activeTab === "builds" && (
                  <>
                    <div className="admin-row">
                      <strong>{item.customerName}</strong>
                      <span className="price">₹{item.estimatedTotal?.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="admin-meta">
                      📧 {item.email} {item.phone && `· 📞 ${item.phone}`}
                    </div>
                    <div className="admin-components">
                      {Object.entries(item.components || {}).map(([k, v]) => (
                        <span key={k}>
                          {k}: <b>{v}</b>
                        </span>
                      ))}
                    </div>
                    {item.notes && <div className="admin-notes">Note: {item.notes}</div>}
                  </>
                )}

                {activeTab === "software" && (
                  <>
                    <div className="admin-row">
                      <strong>{item.customerName}</strong>
                    </div>
                    <div className="admin-meta">📧 {item.email}</div>
                    <div className="admin-components">
                      {(item.categories || []).map((c) => (
                        <span key={c}>{c}</span>
                      ))}
                    </div>
                    {item.description && <div className="admin-notes">{item.description}</div>}
                  </>
                )}

                {activeTab === "contact" && (
                  <>
                    <div className="admin-row">
                      <strong>{item.name}</strong>
                    </div>
                    <div className="admin-meta">📧 {item.email}</div>
                    <div className="admin-notes">{item.message}</div>
                  </>
                )}

                <div className="admin-date">
                  {item.createdAt && new Date(item.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Admin;
