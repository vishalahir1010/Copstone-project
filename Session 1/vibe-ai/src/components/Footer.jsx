import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaGithub,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="navbar-brand">
              <span className="navbar-brand-icon">♫</span>
              VibeAI
            </Link>

            <p>
              Discover music that matches your mood.
              Create personalized playlists with AI.
            </p>

            {/* Social Icons */}
            <div className="footer-links" style={{ flexDirection: "row", gap: "0.75rem", marginTop: "0.75rem" }}>
              <a
                href="#"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <FaInstagram size={18} />
              </a>

              <a
                href="#"
                aria-label="X"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <FaXTwitter size={18} />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <FaYoutube size={18} />
              </a>

              <a
                href="#"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="footer-title">Product</h4>

            <div className="footer-links">
              <Link to="/discover" className="footer-link">Discover</Link>
              <Link to="/library" className="footer-link">Library</Link>
              <Link to="/create-playlist" className="footer-link">AI Playlist</Link>
              <Link to="/pricing" className="footer-link">Pricing</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="footer-title">Company</h4>

            <div className="footer-links">
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
              <Link to="/faq" className="footer-link">FAQ</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="footer-title">Legal</h4>

            <div className="footer-links">
              <Link to="/privacy" className="footer-link">Privacy</Link>
              <Link to="/terms" className="footer-link">Terms</Link>
              <Link to="/cookies" className="footer-link">Cookies</Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} VibeAI. All rights reserved.
          </p>

          <p>Made for music lovers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
