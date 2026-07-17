import { useState, useMemo } from "react";
import {
  cpuOptions,
  gpuOptions,
  motherboardOptions,
  ramOptions,
  storageOptions,
  coolingOptions,
  thermalPasteOptions,
  psuOptions,
  caseOptions,
} from "../data/components.js";

const API_URL = "/api/builds";

const categories = [
  { key: "cpu", label: "CPU", options: cpuOptions, tagKey: "brand" },
  { key: "gpu", label: "GPU", options: gpuOptions, tagKey: "brand" },
  { key: "motherboard", label: "Motherboard", options: motherboardOptions, tagKey: "brand" },
  { key: "ram", label: "RAM", options: ramOptions, tagKey: "brand" },
  { key: "storage", label: "Storage", options: storageOptions, tagKey: "brand" },
  { key: "cooling", label: "Cooling", options: coolingOptions, tagKey: "type" },
  { key: "thermalPaste", label: "Thermal Paste", options: thermalPasteOptions, tagKey: null },
  { key: "psu", label: "Power Supply", options: psuOptions, tagKey: "brand" },
  { key: "pcCase", label: "Case", options: caseOptions, tagKey: "brand" },
];

const labelMap = Object.fromEntries(categories.map((c) => [c.key, c.label]));

function PCBuilder() {
  const [selected, setSelected] = useState({});
  const [customer, setCustomer] = useState({ customerName: "", email: "", phone: "", notes: "" });
  const [status, setStatus] = useState(null);

  const total = useMemo(
    () => Object.values(selected).reduce((sum, item) => sum + (item?.price || 0), 0),
    [selected]
  );

  const pick = (key, option) => {
    setSelected((prev) => ({ ...prev, [key]: option }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!customer.customerName || !customer.email) {
      setStatus({ type: "error", msg: "Name and email are required." });
      return;
    }
    if (Object.keys(selected).length === 0) {
      setStatus({ type: "error", msg: "Pick at least one component first." });
      return;
    }

    const components = {};
    Object.entries(selected).forEach(([key, val]) => {
      components[key] = val.name;
    });

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...customer,
          components,
          estimatedTotal: total,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus({ type: "success", msg: "Build ticket submitted! We'll email you a confirmation." });
    } catch (err) {
      setStatus({ type: "error", msg: "Couldn't submit — is the backend running?" });
    }
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-label">Custom build</div>
            <h2>Choose your parts</h2>
          </div>
          <p>Pick a component in each category. Your build ticket updates on the right as you go.</p>
        </div>

        <div className="builder-layout">
          <div>
            {categories.map((cat) => (
              <div className="builder-category" key={cat.key}>
                <h4>{cat.label}</h4>
                <div className="option-grid">
                  {cat.options.map((opt) => {
                    const isSelected = selected[cat.key]?.name === opt.name;
                    return (
                      <div
                        key={opt.name}
                        className={`option-card${isSelected ? " selected" : ""}`}
                        onClick={() => pick(cat.key, opt)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && pick(cat.key, opt)}
                      >
                        {cat.tagKey && <span className="brand-tag">{opt[cat.tagKey]}</span>}
                        <span className="name">{opt.name}</span>
                        <span className="price">
                          {opt.price ? `₹${opt.price.toLocaleString("en-IN")}` : opt.note || "—"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="build-ticket">
            <div className="ticket-header">
              <div className="label">Build Ticket</div>
              <div className="id">#CF-{Math.floor(Date.now() / 100000) % 100000}</div>
            </div>
            <div className="ticket-body">
              {categories.map((cat) => (
                <div className={`ticket-row${!selected[cat.key] ? " empty" : ""}`} key={cat.key}>
                  <span>{labelMap[cat.key]}</span>
                  <span className="val">{selected[cat.key]?.name || "not selected"}</span>
                </div>
              ))}
            </div>
            <div className="ticket-total">
              <span className="label">Estimated total</span>
              <span className="amount">₹{total.toLocaleString("en-IN")}</span>
            </div>

            <form className="ticket-form" onSubmit={handleSubmit}>
              <div className="field">
                <label>Your name</label>
                <input
                  value={customer.customerName}
                  onChange={(e) => setCustomer({ ...customer, customerName: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </div>
              <div className="field">
                <label>Phone (optional)</label>
                <input
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="+91..."
                />
              </div>
              <div className="field">
                <label>Notes (optional)</label>
                <textarea
                  value={customer.notes}
                  onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                  placeholder="Any specific requirements..."
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit build ticket
              </button>
              {status && (
                <div className={`status-msg ${status.type}`}>{status.msg}</div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PCBuilder;
