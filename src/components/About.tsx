import React from 'react'
import './About.css'

const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="about-container">
        <div className="about-image">
          <div className="about-image-placeholder">
            <svg width="100%" height="100%" viewBox="0 0 500 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="500" height="600" fill="#f5f5f5"/>
              <rect x="50" y="50" width="400" height="500" rx="4" fill="white" stroke="#e0e0e0" strokeWidth="2"/>
              <circle cx="250" cy="200" r="80" fill="#1a1a1a" opacity="0.1"/>
              <rect x="150" y="320" width="200" height="20" rx="10" fill="#1a1a1a" opacity="0.1"/>
              <rect x="100" y="360" width="300" height="15" rx="7.5" fill="#1a1a1a" opacity="0.05"/>
              <rect x="100" y="390" width="300" height="15" rx="7.5" fill="#1a1a1a" opacity="0.05"/>
              <rect x="100" y="420" width="300" height="15" rx="7.5" fill="#1a1a1a" opacity="0.05"/>
              <text x="250" y="520" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="14" fill="#999">Profile Image</text>
            </svg>
          </div>
        </div>
        <div className="about-content">
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            I'm a multidisciplinary artist and creative professional with expertise across 
            eight different artistic domains. My work combines technical skill with creative 
            vision, delivering unique solutions that blend artistry with functionality.
          </p>
          <div className="about-stats">
            <div className="stat">
              <span className="stat-number">8</span>
              <span className="stat-label">Creative Disciplines</span>
            </div>
            <div className="stat">
              <span className="stat-number">∞</span>
              <span className="stat-label">Cups of Tea</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Dedication</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
