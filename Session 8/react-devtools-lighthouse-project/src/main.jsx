import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const features = [
  { icon: "📱", title: "Responsive", text: "The layout adapts from mobile to tablet and desktop." },
  { icon: "⚡", title: "Fast", text: "Lightweight React components and optimized CSS." },
  { icon: "🔍", title: "Testable", text: "Ready for Chrome DevTools and Lighthouse audits." }
];

function App() {
  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="#home">DevLab</a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#audit">Audit</a>
        </nav>
        <button className="menu-btn" aria-label="Open menu">☰</button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <p className="eyebrow">REACT + DEVTOOLS LAB</p>
            <h1>Build it. Test it. <span>Improve it.</span></h1>
            <p className="hero-text">
              A responsive React homepage made for practicing mobile, tablet,
              desktop, cross-browser, and Lighthouse testing.
            </p>
            <div className="actions">
              <a className="primary-btn" href="#features">Explore Features</a>
              <a className="secondary-btn" href="#audit">View Audit</a>
            </div>
          </div>

          <div className="hero-card" aria-label="Performance preview">
            <div className="card-top">
              <span className="status-dot"></span>
              <span>Performance dashboard</span>
            </div>
            <div className="score">92</div>
            <p>Lighthouse-style practice score</p>
            <div className="meter"><span></span></div>
            <div className="mini-stats">
              <div><strong>0.9s</strong><small>FCP</small></div>
              <div><strong>1.4s</strong><small>LCP</small></div>
              <div><strong>0.02</strong><small>CLS</small></div>
            </div>
          </div>
        </section>

        <section className="features" id="features">
          <div className="section-heading">
            <p className="eyebrow">WHY THIS PROJECT</p>
            <h2>Designed to test every screen</h2>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="audit" id="audit">
          <div>
            <p className="eyebrow">LIGHTHOUSE CHECK</p>
            <h2>Run your own audit in Chrome</h2>
            <p>
              Open DevTools → Lighthouse → Mobile or Desktop → Analyze page load.
              Record the score, fix one opportunity, and run it again.
            </p>
          </div>
          <div className="check-list">
            <div>✓ Responsive viewport</div>
            <div>✓ Semantic HTML</div>
            <div>✓ Meta description</div>
            <div>✓ Lightweight assets</div>
          </div>
        </section>
      </main>

      <footer>
        <span>React DevTools Lab</span>
        <span>Built for responsive testing practice</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
