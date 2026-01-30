import React from 'react'
import './Mission.css'

const Mission: React.FC = () => {
  return (
    <section id="mission" className="mission">
      <div className="mission-container">
        <h2 className="section-title">The Ochatako Story</h2>
        <div className="mission-content">
          <p className="mission-text">
            The name "Ochatako" is a fusion of two elements that define my creative philosophy. 
            <strong> "Cha" </strong> represents tea - my favorite beverage, symbolizing the calm, 
            thoughtful approach I bring to every project. <strong>"Tako"</strong> means octopus in Japanese, 
            representing versatility and the ability to work across eight different creative disciplines simultaneously.
          </p>
          <p className="mission-text">
            Just as an octopus uses its eight arms with precision and grace, I navigate through 
            diverse artistic mediums, bringing expertise and passion to each unique endeavor. 
            Whether it's design, illustration, photography, or any of my other creative pursuits, 
            every project receives the same dedication and artistry.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Mission
