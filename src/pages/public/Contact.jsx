import { useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

/* ─── Social card data ─────────────────────────────────────────── */
const SOCIAL_CARDS = [
  {
    id: 'linkedin',
    Icon: Linkedin,
    iconColor: '#0a66c2',
    label: 'LinkedIn',
    handle: 'linkedin.com/in/agalya-g',
    href: 'https://www.linkedin.com/in/agalya-g',
  },
  {
    id: 'github',
    Icon: Github,
    iconColor: '#ffffff',
    label: 'GitHub',
    handle: 'github.com/agalya2207',
    href: 'https://github.com/agalya2207',
  },
  {
    id: 'email',
    Icon: Mail,
    iconColor: '#a78bfa',
    label: 'Email',
    handle: 'agalya.2207@gmail.com',
    href: 'mailto:agalya.2207@gmail.com',
  },
];

/* ─── Component ────────────────────────────────────────────────── */
const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitted(false);
    setError(false);

    try {
      // Replace YOUR_FORMSPREE_URL with your Formspree endpoint
      // e.g. https://formspree.io/f/xxxxxxxx
      const response = await fetch('YOUR_FORMSPREE_URL', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ct-root">
      <style>{`
        /* ── Root ───────────────────────────────────────────────── */
        .ct-root {
          position: fixed;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 72px 40px 0 40px;
          box-sizing: border-box;
          font-family: 'Poppins', 'Inter', sans-serif;
          overflow: hidden;
          z-index: 10;
        }

        /* ── Content centering wrapper ───────────────────────── */
        .ct-content-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        /* ── Two-column grid ────────────────────────────────────── */
        .ct-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          width: 100%;
          max-width: 1100px;
          align-items: start;
        }

        /* ══════════════════════════════════════════════════════════
           LEFT — Terminal form panel
        ══════════════════════════════════════════════════════════ */
        .ct-left {
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-self: start;
        }

        .ct-badge {
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #7c3aed;
          text-transform: uppercase;
          margin: 0;
        }

        .ct-heading {
          font-family: 'Poppins', 'Inter', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }

        .ct-underline {
          width: 52px;
          height: 3px;
          background: linear-gradient(90deg, #7c3aed, #a78bfa);
          border-radius: 2px;
          margin: 0;
        }

        .ct-desc {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.5);
          line-height: 1.6;
          margin: 0;
          max-width: 420px;
        }

        /* ── Form ──────────────────────────────────────────────── */
        .ct-form {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 4px;
        }

        .ct-field {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .ct-label {
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: rgba(167,139,250,0.8);
          text-transform: uppercase;
        }

        .ct-input, .ct-textarea {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 8px;
          color: #ffffff;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.82rem;
          padding: 10px 14px;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
          width: 100%;
          box-sizing: border-box;
        }

        .ct-input::placeholder, .ct-textarea::placeholder {
          color: rgba(255,255,255,0.25);
        }

        .ct-input:focus, .ct-textarea:focus {
          border-color: #7c3aed;
          box-shadow: 0 0 0 3px rgba(124,58,237,0.18);
        }

        .ct-textarea {
          resize: none;
          height: 80px;
          line-height: 1.5;
        }

        .ct-submit-btn {
          width: 100%;
          padding: 13px 0;
          background: linear-gradient(135deg, #7c3aed, #6d28d9);
          border: none;
          border-radius: 9px;
          color: #fff;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.82rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 4px 16px rgba(124,58,237,0.4);
          margin-top: 4px;
        }

        .ct-submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(124,58,237,0.6);
          background: linear-gradient(135deg, #8b5cf6, #7c3aed);
        }

        .ct-submit-btn:active {
          transform: translateY(0);
        }

        .ct-submit-btn.sent {
          background: linear-gradient(135deg, #059669, #10b981);
          box-shadow: 0 4px 16px rgba(16,185,129,0.4);
          cursor: default;
          transform: none;
        }

        /* ══════════════════════════════════════════════════════════
           RIGHT — Social links panel
        ══════════════════════════════════════════════════════════ */
        .ct-right {
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-self: start;
        }

        .ct-social-badge {
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #22c55e;
          margin: 0;
        }

        .ct-cards {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ct-card {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 16px 18px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          text-decoration: none;
          cursor: pointer;
          transition: border-color 0.25s ease, background 0.25s ease, transform 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .ct-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(124,58,237,0.04), transparent);
          opacity: 0;
          transition: opacity 0.25s ease;
          border-radius: inherit;
        }

        .ct-card:hover {
          border-color: #7c3aed;
          background: rgba(124,58,237,0.06);
          transform: translateX(4px);
        }

        .ct-card:hover::before {
          opacity: 1;
        }

        .ct-card-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.25s ease;
        }

        .ct-card:hover .ct-card-icon-wrap {
          background: rgba(124,58,237,0.15);
        }

        .ct-card-text {
          flex: 1;
          min-width: 0;
        }

        .ct-card-label {
          font-size: 0.82rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 2px 0;
          letter-spacing: 0.02em;
        }

        .ct-card-handle {
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.4);
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 0.25s ease;
        }

        .ct-card:hover .ct-card-handle {
          color: rgba(167,139,250,0.7);
        }

        .ct-card-arrow {
          font-size: 1rem;
          color: rgba(255,255,255,0.25);
          transition: color 0.25s ease, transform 0.25s ease;
          flex-shrink: 0;
        }

        .ct-card:hover .ct-card-arrow {
          color: #a78bfa;
          transform: translate(2px, -2px);
        }

        /* ── Availability badge ─────────────────────────────────── */
        .ct-availability {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 18px;
          background: rgba(34,197,94,0.06);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 12px;
          margin-top: 4px;
        }

        .ct-avail-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #22c55e;
          flex-shrink: 0;
          box-shadow: 0 0 0 0 rgba(34,197,94,0.6);
          animation: ctPulse 2s ease infinite;
        }

        @keyframes ctPulse {
          0%   { box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
          60%  { box-shadow: 0 0 0 6px rgba(34,197,94,0); }
          100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
        }

        .ct-avail-text p {
          margin: 0;
        }

        .ct-avail-status {
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #22c55e;
        }

        .ct-avail-sub {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.4);
          margin-top: 1px !important;
        }

        /* ══════════════════════════════════════════════════════════
           BOTTOM BAR
        ══════════════════════════════════════════════════════════ */
        .ct-bottom {
          width: 100%;
          max-width: 1100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 0 12px 0;
          border-top: 1px solid rgba(255,255,255,0.07);
          margin-top: 16px;
        }

        .ct-bottom-left {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.67rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #22c55e;
        }

        .ct-bottom-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          animation: ctPulse 2s ease infinite;
        }

        .ct-bottom-right {
          font-family: 'Courier New', Courier, monospace;
          font-size: 0.65rem;
          color: rgba(255,255,255,0.25);
          letter-spacing: 0.08em;
        }

        /* ══════════════════════════════════════════════════════════
           RESPONSIVE
        ══════════════════════════════════════════════════════════ */
        @media (max-width: 800px) {
          .ct-root {
            padding: 80px 24px 0 24px;
            justify-content: flex-start;
            overflow-y: auto;
          }
          .ct-grid {
            grid-template-columns: 1fr;
            overflow: visible;
          }
          .ct-textarea {
            height: 90px;
          }
        }

        @media (max-width: 480px) {
          .ct-root {
            padding: 72px 16px 0 16px;
          }
          .ct-heading {
            font-size: 1.5rem;
          }
        }
      `}</style>

      {/* ── Content centering wrapper ─────────────────────────── */}
      <div className="ct-content-wrap">
      <div className="ct-grid">

        {/* ═══ LEFT — Terminal form ════════════════════════════ */}
        <div className="ct-left">
          <p className="ct-badge">[ ESTABLISH_CONNECTION ]</p>
          <h1 className="ct-heading">CONTACT TERMINAL</h1>
          <div className="ct-underline" />
          <p className="ct-desc">
            Open to freelance, full-time roles, and collaborations.
            Drop a message — usually responds within 24hrs.
          </p>

          <form className="ct-form" onSubmit={handleSubmit} noValidate>
            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-name">IDENTIFIER</label>
              <input
                id="ct-name"
                name="name"
                type="text"
                className="ct-input"
                placeholder="your name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-email">SIGNAL_ADDRESS</label>
              <input
                id="ct-email"
                name="email"
                type="email"
                className="ct-input"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="off"
              />
            </div>

            <div className="ct-field">
              <label className="ct-label" htmlFor="ct-message">PAYLOAD</label>
              <textarea
                id="ct-message"
                name="message"
                className="ct-textarea"
                placeholder="your message..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              id="ct-submit-btn"
              className={`ct-submit-btn${submitted ? ' sent' : ''}`}
              disabled={submitting || submitted}
            >
              {submitting ? 'TRANSMITTING...' : submitted ? '✓ MESSAGE_TRANSMITTED' : '▶ TRANSMIT_MESSAGE'}
            </button>

            {/* Success message */}
            {submitted && (
              <p style={{
                fontFamily: 'Courier New, Courier, monospace',
                fontSize: '11px',
                letterSpacing: '1.5px',
                color: '#4ade80',
                marginTop: '10px',
                marginBottom: 0,
              }}>
                ✓ MESSAGE_TRANSMITTED — I{"'"ll} get back to you within 24hrs.
              </p>
            )}

            {/* Error message */}
            {error && (
              <p style={{
                fontFamily: 'Courier New, Courier, monospace',
                fontSize: '11px',
                letterSpacing: '1.5px',
                color: '#f87171',
                marginTop: '10px',
                marginBottom: 0,
              }}>
                ✕ TRANSMISSION_FAILED — try again
              </p>
            )}
          </form>
        </div>

        {/* ═══ RIGHT — Social links ════════════════════════════ */}
        <div className="ct-right">
          <p className="ct-social-badge">// SOCIAL_LINKS : ACTIVE</p>

          <div className="ct-cards">
            {SOCIAL_CARDS.map(({ id, Icon, iconColor, label, handle, href }) => (
              <a
                key={id}
                id={`ct-card-${id}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="ct-card"
                onMouseEnter={() => setHoveredCard(id)}
                onMouseLeave={() => setHoveredCard(null)}
                aria-label={`Visit ${label}`}
              >
                <div className="ct-card-icon-wrap">
                  <Icon size={20} color={hoveredCard === id ? '#a78bfa' : iconColor} strokeWidth={1.8} />
                </div>
                <div className="ct-card-text">
                  <p className="ct-card-label">{label}</p>
                  <p className="ct-card-handle">{handle}</p>
                </div>
                <span className="ct-card-arrow">↗</span>
              </a>
            ))}
          </div>

          {/* Availability badge */}
          <div className="ct-availability">
            <div className="ct-avail-dot" />
            <div className="ct-avail-text">
              <p className="ct-avail-status">STATUS : AVAILABLE</p>
              <p className="ct-avail-sub">Open to new opportunities</p>
            </div>
          </div>
        </div>
      </div>

      </div>{/* /ct-content-wrap */}

      {/* ── Bottom bar ───────────────────────────────────────── */}
      <div className="ct-bottom">
        <div className="ct-bottom-left">
          <div className="ct-bottom-dot" />
          SYSTEM_ONLINE
        </div>
        <span className="ct-bottom-right">AGALYA_G.PORTFOLIO © 2026</span>
      </div>
    </div>
  );
};

export default Contact;
