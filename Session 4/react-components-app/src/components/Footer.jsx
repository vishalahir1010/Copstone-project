import React from "react";

function Footer({ socialLinks }) {
  return (
    <footer className="footer">
      <h3>🛒 ShopKart</h3>

      <p>© 2026 ShopKart. All rights reserved.</p>

      <div className="social-links">
        {socialLinks.map((social) => (
          <a
            href={social.url}
            key={social.name}
            target="_blank"
            rel="noreferrer"
            title={social.name}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </footer>
  );
}

export default Footer;