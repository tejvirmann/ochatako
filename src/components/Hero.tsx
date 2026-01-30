import React from 'react'
import './Hero.css'

const Hero: React.FC = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-line">Creative Art</span>
          <span className="hero-line">Eight Different Ways</span>
          <span className="hero-line">One Unique Vision</span>
        </h1>
        <p className="hero-description">
          Welcome to Ochatako - where creativity flows like tea and versatility 
          reaches like an octopus. Explore a diverse portfolio of artistic services 
          spanning eight unique creative disciplines.
        </p>
        <div className="hero-cta">
          <a href="#portfolio" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-secondary">Get in Touch</a>
        </div>
      </div>
      <div className="hero-image">
        <div className="hero-image-placeholder">
          <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="800" height="600" fill="#f5f5f5"/>
            <rect x="50" y="50" width="700" height="500" rx="4" fill="white" stroke="#e0e0e0" strokeWidth="2"/>
            <circle cx="200" cy="200" r="40" fill="#1a1a1a" opacity="0.1"/>
            <circle cx="400" cy="200" r="40" fill="#1a1a1a" opacity="0.1"/>
            <circle cx="600" cy="200" r="40" fill="#1a1a1a" opacity="0.1"/>
            <rect x="150" y="300" width="100" height="150" rx="2" fill="#1a1a1a" opacity="0.1"/>
            <rect x="350" y="300" width="100" height="150" rx="2" fill="#1a1a1a" opacity="0.1"/>
            <rect x="550" y="300" width="100" height="150" rx="2" fill="#1a1a1a" opacity="0.1"/>
            <text x="400" y="520" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fill="#999">Creative Portfolio Preview</text>
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero
