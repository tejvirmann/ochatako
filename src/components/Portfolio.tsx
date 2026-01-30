import React from 'react'
import './Portfolio.css'

interface Project {
  id: number
  title: string
  category: string
  description: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Project Alpha',
    category: 'Graphic Design',
    description: 'A stunning visual identity system combining modern aesthetics with timeless design principles.'
  },
  {
    id: 2,
    title: 'Digital Dreams',
    category: 'Illustration',
    description: 'Original digital artwork exploring themes of nature and technology in vibrant detail.'
  },
  {
    id: 3,
    title: 'Urban Canvas',
    category: 'Photography',
    description: 'A photographic series capturing the raw beauty and energy of urban landscapes.'
  },
  {
    id: 4,
    title: 'Motion Poetry',
    category: 'Animation',
    description: 'Fluid motion graphics that bring abstract concepts to life through dynamic storytelling.'
  },
  {
    id: 5,
    title: 'Brand Evolution',
    category: 'Branding',
    description: 'Complete brand transformation project from concept to final implementation.'
  },
  {
    id: 6,
    title: 'Interactive Experience',
    category: 'Web Design',
    description: 'A cutting-edge web interface designed for seamless user interaction and engagement.'
  },
  {
    id: 7,
    title: 'Editorial Series',
    category: 'Typography',
    description: 'Experimental typography work pushing the boundaries of letterform and layout design.'
  },
  {
    id: 8,
    title: 'Creative Direction',
    category: 'Art Direction',
    description: 'Full creative direction for a multi-platform campaign blending various artistic mediums.'
  }
]

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="portfolio">
      <div className="portfolio-container">
        <div className="portfolio-header">
          <h2 className="section-title">Selected Work</h2>
          <p className="section-subtitle">
            A curated selection of projects showcasing the breadth and depth of 
            my creative capabilities across eight different disciplines.
          </p>
        </div>
        <div className="portfolio-grid">
          {projects.map((project) => (
            <div key={project.id} className="portfolio-item">
              <div className="portfolio-image">
                <div className="portfolio-image-placeholder">
                  <svg width="100%" height="100%" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="600" height="400" fill="#f5f5f5"/>
                    <rect x="50" y="50" width="500" height="300" rx="4" fill="white" stroke="#e0e0e0" strokeWidth="2"/>
                    <rect x="100" y="100" width="150" height="100" rx="2" fill="#1a1a1a" opacity="0.1"/>
                    <rect x="350" y="100" width="150" height="100" rx="2" fill="#1a1a1a" opacity="0.1"/>
                    <circle cx="200" cy="250" r="30" fill="#1a1a1a" opacity="0.1"/>
                    <circle cx="400" cy="250" r="30" fill="#1a1a1a" opacity="0.1"/>
                  </svg>
                </div>
              </div>
              <div className="portfolio-info">
                <span className="portfolio-category">{project.category}</span>
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Portfolio
