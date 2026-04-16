import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '@presentation/components/common/Header'

export function HomePage() {
  const [menuOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen font-custom-sans bg-white">
      <Header />

      <nav className="bg-purple-900 px-6 py-0.5">
        <ul
          className={`flex items-center justify-center gap-0 h-14 list-none ${
            menuOpen ? 'open' : ''
          }`}
        >
          <li>
            <a
              href="#home"
              className="text-lg font-normal text-white no-underline px-7 transition-opacity hover:opacity-85"
            >
              Home
            </a>
          </li>
          <li className="text-white opacity-55 text-xl leading-none select-none">
            |
          </li>
          <li>
            <a
              href="#about"
              className="text-lg font-normal text-white no-underline px-7 transition-opacity hover:opacity-85"
            >
              About
            </a>
          </li>
        </ul>
      </nav>

      <main className="grid grid-cols-1 lg:grid-cols-2 flex-1 min-h-[620px]">
        {/* Left Section */}
        <section
          className="relative flex items-end justify-center pb-16 overflow-hidden cursor-default bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,5,20,0.15)] via-[rgba(10,5,20,0.55)] to-[rgba(10,5,20,0.72)] z-0" />

          <div className="relative z-10 text-center text-white max-w-96 px-8 flex flex-col items-center gap-4 fade-up">
            <h1
              className="font-playfair text-5xl font-black italic leading-tight text-shadow"
              style={{
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)',
              }}
            >
              Become an Artist
            </h1>

            <p
              className="text-base font-light leading-relaxed max-w-80 text-shadow"
              style={{
                textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              Join us as an artist and start selling your unique clothes!
            </p>

            <p
              className="text-base font-normal text-white text-shadow"
              style={{
                textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              <strong>Start selling today!</strong>
            </p>

            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center mt-2 px-12 py-[18px] bg-purple-300 text-gray-900 font-bold text-sm tracking-widest uppercase rounded-full cursor-pointer transition-all hover:bg-purple-400 hover:shadow-lg active:translate-y-0"
              style={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
              }}
            >
              BECOME AN ARTIST
            </button>
          </div>
        </section>

        {/* Right Section */}
        <section
          className="relative flex items-end justify-center pb-16 overflow-hidden cursor-default bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(10,5,20,0.15)] via-[rgba(10,5,20,0.55)] to-[rgba(10,5,20,0.72)] z-0" />

          <div className="relative z-10 text-center text-white max-w-96 px-8 flex flex-col items-center gap-4 fade-up fade-up-delay">
            <h1
              className="font-playfair text-5xl font-black italic leading-tight text-shadow"
              style={{
                textShadow: '0 2px 12px rgba(0, 0, 0, 0.4)',
              }}
            >
              Buy Your Dream Clothes
            </h1>

            <p
              className="text-base font-light leading-relaxed max-w-80 text-shadow"
              style={{
                textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)',
              }}
            >
              Ever wanted creative clothing that no one else has? Check out our
              website for unique clothes <strong>made just for you!</strong>
            </p>

            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center justify-center mt-2 px-12 py-[18px] bg-purple-300 text-gray-900 font-bold text-sm tracking-widest uppercase rounded-full cursor-pointer transition-all hover:bg-purple-400 hover:shadow-lg active:translate-y-0"
              style={{
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
              }}
            >
              SHOP HERE
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}