
import { useState } from 'react'
import '../../shared/utils/homepage.css'

export function HomePage() {
  const [menuOpen] = useState(false)

  return (
    <div className="home-page">
      <header className="top-bar">
        <span className="brand">INSPIRER</span>
        <div className="lotus-icon" aria-hidden="true">
          <svg width="48" height="40" viewBox="0 0 48 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Lotus Icon */}
          </svg>
        </div>
        <div className="top-bar-right">
          <span className="login-text">Login</span>
        </div>
      </header>

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