
import { useState } from 'react'
import { Header } from '@presentation/components/common/Header'
import '../../shared/utils/homepage.css'

export function HomePage() {
  const [menuOpen] = useState(false)

  return (
    <div className="home-page">
      <Header />

      <nav className="nav-bar">
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><a href="#home" className="nav-link active">Home</a></li>
          <li className="separator">|</li>
          <li><a href="#about" className="nav-link">About</a></li>
        </ul>
      </nav>

      <main className="hero-split">
        <section className="hero-panel panel-artist">
          <div className="panel-overlay" />
          <div className="panel-content">
            <h1 className="panel-title">Become an Artist</h1>
            <p className="panel-desc">
              Join us as an artist and start selling your unique clothes!
            </p>
            <p className="panel-cta-text">
              <strong>Start selling today!</strong>
            </p>
            <button className="pill-btn">BECOME AN ARTIST</button>
          </div>
        </section>

        <section className="hero-panel panel-shop">
          <div className="panel-overlay" />
          <div className="panel-content">
            <h1 className="panel-title">Buy Your Dream Clothes</h1>
            <p className="panel-desc">
              Ever wanted creative clothing that no one else has? Check out our
              website for unique clothes <strong>made just for you!</strong>
            </p>
            <button className="pill-btn">SHOP HERE</button>
          </div>
        </section>
      </main>
    </div>
  )
}