// src/Footer.jsx
import "./Footer.css";
import instagramIcon from "./assets/instagram.jpg"; // replace with your icon in assets

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-contact container">
        <p>Email: info@aponomics.com</p>
        <p>Phone: +998 90 123 4567</p>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={instagramIcon} alt="Instagram" className="footer-icon" />
        </a>
      </div>
      <div className="footer-copyright">
        &copy; 2025 <span className="copyright-symbol">C</span> APonomics
      </div>
    </footer>
  );
}

export default Footer;
