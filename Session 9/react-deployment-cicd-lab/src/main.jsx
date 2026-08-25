import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

function App() {
  return (
    <div className="page">
      <nav className="nav">
        <div className="logo">DeployLab</div>
        <div className="links">
          <a href="#home">Home</a>
          <a href="#tasks">Tasks</a>
          <a href="#cicd">CI/CD</a>
        </div>
      </nav>

      <main id="home">
        <section className="hero">
          <div className="badge">REACT • DEPLOYMENT PRACTICE</div>
          <h1>React Deployment Test</h1>
          <p>
            A simple React app created for practicing Netlify, Firebase Hosting,
            Vercel custom domains, and CI/CD workflows.
          </p>
          <div className="buttons">
            <a className="primary" href="#tasks">View Tasks</a>
            <a className="secondary" href="#cicd">Learn CI/CD</a>
          </div>
        </section>

        <section className="grid" id="tasks">
          <article>
            <span>01</span>
            <h2>Netlify</h2>
            <p>Build and deploy this simple React app to Netlify and verify the live homepage.</p>
          </article>
          <article>
            <span>02</span>
            <h2>Firebase Hosting</h2>
            <p>Configure the Vite build output in firebase.json and deploy without root-route 404 errors.</p>
          </article>
          <article>
            <span>03</span>
            <h2>Custom Domain</h2>
            <p>Connect a domain or subdomain to your deployed app and verify DNS and HTTPS.</p>
          </article>
        </section>

        <section className="cicd" id="cicd">
          <div>
            <div className="badge">CI/CD</div>
            <h2>Ship updates with confidence</h2>
            <p>
              CI/CD means Continuous Integration and Continuous Delivery/Deployment.
              It automates checking, building, and releasing application changes.
              It can automatically run tests and builds whenever code is pushed.
              It can also publish successful changes to a hosting platform with less manual work.
            </p>
          </div>
          <div className="checks">
            <div>✓ Automatic build on every push</div>
            <div>✓ Automated tests before release</div>
            <div>✓ Faster and repeatable deployments</div>
          </div>
        </section>
      </main>

      <footer>
        <span>React Deployment & CI/CD Lab</span>
        <span>Vite + React</span>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
