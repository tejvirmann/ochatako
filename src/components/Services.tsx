import React from 'react'
import './Services.css'

interface Service {
  id: number
  title: string
  description: string
  icon: string
}

const services: Service[] = [
  {
    id: 1,
    title: 'Graphic Design',
    description: 'Visual communication through logos, layouts, and brand identity systems that make lasting impressions.',
    icon: '🎨'
  },
  {
    id: 2,
    title: 'Illustration',
    description: 'Original artwork and digital illustrations that bring ideas and stories to life with unique style.',
    icon: '✏️'
  },
  {
    id: 3,
    title: 'Photography',
    description: 'Professional photography capturing moments, products, and environments with artistic vision.',
    icon: '📷'
  },
  {
    id: 4,
    title: 'Animation',
    description: 'Motion graphics and animated content that engage audiences through dynamic visual storytelling.',
    icon: '🎬'
  },
  {
    id: 5,
    title: 'Branding',
    description: 'Complete brand strategy and identity development from concept to implementation.',
    icon: '💼'
  },
  {
    id: 6,
    title: 'Web Design',
    description: 'Modern, responsive web interfaces that combine aesthetics with seamless user experience.',
    icon: '💻'
  },
  {
    id: 7,
    title: 'Typography',
    description: 'Custom lettering and typographic design that communicates with clarity and creativity.',
    icon: '🔤'
  },
  {
    id: 8,
    title: 'Art Direction',
    description: 'Creative direction and visual strategy for cohesive multi-platform campaigns.',
    icon: '🎯'
  }
]

const Services: React.FC = () => {
  return (
    <section id="services" className="services">
      <div className="services-container">
        <div className="services-header">
          <h2 className="section-title">Eight Creative Disciplines</h2>
          <p className="section-subtitle">
            Like an octopus with eight arms, I offer expertise across eight distinct 
            creative services, each delivered with precision and passion.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-item">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
