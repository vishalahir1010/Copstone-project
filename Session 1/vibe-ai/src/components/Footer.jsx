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
      <div className="footer-main">
        {/* Brand */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="navbar-logo-icon">♫</span>
            VibeAI
          </Link>

          <p>
            Discover music that matches your mood.
            Create personalized playlists with AI.
          </p>

          {/* Social Icons */}
          <div className="footer-socials">
            <a
              href="#"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="#"
              aria-label="X"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter size={18} />
            </a>

            <a
              href="#"
              aria-label="YouTube"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube size={18} />
            </a>

            <a
              href="#"
              aria-label="GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={18} />
            </a>
          </div>
        </div>

        {/* Product */}
        <div className="footer-column">
          <h4>Product</h4>

          <Link to="/discover">Discover</Link>
          <Link to="/library">Library</Link>
          <Link to="/create-playlist">AI Playlist</Link>
          <Link to="/pricing">Pricing</Link>
        </div>

        {/* Company */}
        <div className="footer-column">
          <h4>Company</h4>

          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        {/* Legal */}
        <div className="footer-column">
          <h4>Legal</h4>

          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/cookies">Cookies</Link>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} VibeAI. All rights reserved.
        </span>

        <span>Made for music lovers.</span>
      </div>
    </footer>
  );
};

export default Footer;
