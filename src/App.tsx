import Header from './components/Header'
import Hero from './components/Hero'
import Mission from './components/Mission'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'
import ParallaxImages from './components/ParallaxImages'
import './App.css'

function App() {
  return (
    <>
      <div className="App">
        <ParallaxImages />
        <Header />
        <Hero />
        <Mission />
        <About />
        <Portfolio />
        <Services />
        <Contact />
        <Footer />
      </div>
      <Chatbot />
    </>
  )
}

export default App
