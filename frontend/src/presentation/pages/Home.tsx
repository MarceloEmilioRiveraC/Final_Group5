
import { useState } from 'react'
import { Header } from '@presentation/components/common/Header'

export function HomePage() {
  const [menuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col font-lato">
      <Header />

      <nav className="bg-purple-900 px-6">
        <ul className={`list-none flex items-center justify-center gap-0 h-[52px] ${menuOpen ? 'open' : ''}`}>
          <li><a href="#home" className="text-white text-lg font-normal px-7 opacity-85 hover:opacity-70 transition-opacity">Home</a></li>
          <li className="text-white/55 text-xl leading-none select-none">|</li>
          <li><a href="#about" className="text-white text-lg font-normal px-7 opacity-85 hover:opacity-70 transition-opacity">About</a></li>
        </ul>
      </nav>

      <main className="grid grid-cols-2 flex-1 min-h-[620px]">
        {/* Artist Panel */}
        <section className="relative flex items-end justify-center pb-16 overflow-hidden cursor-default bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80')" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/55 to-black/72 z-10"></div>
          <div className="relative z-20 text-center text-white max-w-[480px] px-8 flex flex-col items-center gap-4 animate-fade-up">
            <h1 className="font-playfair font-black italic text-4xl sm:text-5xl lg:text-6xl leading-tight text-shadow tracking-normal">
              Become an Artist
            </h1>
            <p className="text-base font-light leading-relaxed text-white/92 text-shadow max-w-96">
              Join us as an artist and start selling your unique clothes!
            </p>
            <p className="text-base font-light leading-relaxed text-white/92 text-shadow">
              <strong>Start selling today!</strong>
            </p>
            <button className="mt-2 px-12 py-4 bg-purple-300 hover:bg-purple-400 active:translate-y-0 hover:-translate-y-0.5 text-gray-900 font-lato font-bold text-sm uppercase tracking-widest rounded-full transition-all shadow-lg hover:shadow-2xl">
              BECOME AN ARTIST
            </button>
          </div>
        </section>

        {/* Shop Panel */}
        <section className="relative flex items-end justify-center pb-16 overflow-hidden cursor-default bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80')" }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/55 to-black/72 z-10"></div>
          <div className="relative z-20 text-center text-white max-w-[480px] px-8 flex flex-col items-center gap-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <h1 className="font-playfair font-black italic text-4xl sm:text-5xl lg:text-6xl leading-tight text-shadow tracking-normal">
              Buy Your Dream Clothes
            </h1>
            <p className="text-base font-light leading-relaxed text-white/92 text-shadow max-w-96">
              Ever wanted creative clothing that no one else has? Check out our
              website for unique clothes <strong>made just for you!</strong>
            </p>
            <button className="mt-2 px-12 py-4 bg-purple-300 hover:bg-purple-400 active:translate-y-0 hover:-translate-y-0.5 text-gray-900 font-lato font-bold text-sm uppercase tracking-widest rounded-full transition-all shadow-lg hover:shadow-2xl">
              SHOP HERE
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}