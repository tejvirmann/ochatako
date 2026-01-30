import React from 'react'
import './Footer.css'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Ochatako</h3>
            <p className="footer-text">
              Creative art services across eight disciplines. 
              Like tea, carefully crafted. Like an octopus, versatile and adaptable.
            </p>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <nav className="footer-nav">
              <a href="#home">Home</a>
              <a href="#mission">Mission</a>
              <a href="#about">About</a>
              <a href="#portfolio">Work</a>
            </nav>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Services</h4>
            <nav className="footer-nav">
              <a href="#services">All Services</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
          <div className="footer-section">
            <h4 className="footer-heading">Connect</h4>
            <nav className="footer-nav">
              <a href="mailto:hello@ochatako.com">Email</a>
              <a href="#" onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('openChatbot')); }}>Chat with AI</a>
            </nav>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Ochatako. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
