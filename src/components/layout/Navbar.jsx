import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import { navigation } from '../../data/navigation'
import Button from '../ui/Button'

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const location = useLocation()

  /* Close menus on route change */
  useEffect(() => {
    setMobileOpen(false)
    setServicesOpen(false)
  }, [location.pathname])

  /* Simple scroll threshold — no GSAP, no flicker */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* All hero sections are dark forest, so:
     - transparent (top)  → cream/light text so it's visible on dark bg
     - scrolled (solid)   → dark ink text on cream background               */
  const textColor   = scrolled ? '#1D2B1D' : '#F6F0E8'
  const mutedColor  = scrolled ? '#8A9A82'  : 'rgba(246,240,232,0.55)'

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? 'rgba(246,240,232,0.97)' : 'transparent',
        backdropFilter:  scrolled ? 'blur(12px)' : 'none',
        boxShadow:       scrolled ? '0 1px 0 rgba(0,0,0,0.06)' : 'none',
      }}
    >
      <nav
        className="mx-auto flex items-center justify-between h-20"
        style={{ maxWidth: '1200px', paddingInline: 'clamp(1.5rem, 5vw, 5rem)' }}
      >
        {/* Logo lockup */}
        <Link to="/" className="flex flex-col leading-none z-50">
          <span
            className="font-serif text-xl font-bold tracking-tight transition-colors duration-300"
            style={{ color: textColor }}
          >
            MPSM
          </span>
          <span
            className="font-sans font-semibold text-[9px] tracking-[0.14em] uppercase mt-0.5 transition-colors duration-300"
            style={{ color: mutedColor }}
          >
            Services
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navigation.map(item =>
            item.children ? (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className="flex items-center gap-1 font-sans font-medium text-sm transition-colors duration-300"
                  style={{ color: textColor }}
                >
                  {item.name}
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-200"
                    style={{ transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  />
                </button>

                {/* Dropdown */}
                <div
                  className="absolute top-full pt-2 left-1/2 -translate-x-1/2 w-64 transition-all duration-200 origin-top"
                  style={{
                    opacity:    servicesOpen ? 1 : 0,
                    transform:  servicesOpen ? 'translateX(-50%) scaleY(1)' : 'translateX(-50%) scaleY(0.95)',
                    visibility: servicesOpen ? 'visible' : 'hidden',
                    pointerEvents: servicesOpen ? 'auto' : 'none',
                  }}
                >
                  <div
                    className="rounded-xl py-2 px-1.5"
                    style={{ backgroundColor: '#FFFFFF', boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
                  >
                    {item.children.map(child => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className="block px-4 py-2.5 rounded-lg font-sans text-sm transition-colors duration-150"
                        style={{ color: '#1D2B1D' }}
                        onMouseOver={e => { e.currentTarget.style.backgroundColor = '#F6F0E8'; e.currentTarget.style.color = '#C4763A' }}
                        onMouseOut={e  => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1D2B1D' }}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className="font-sans font-medium text-sm transition-colors duration-300"
                style={{ color: textColor }}
                onMouseOver={e => e.currentTarget.style.color = '#C4763A'}
                onMouseOut={e  => e.currentTarget.style.color = textColor}
              >
                {item.name}
              </Link>
            )
          )}

          <Link
            to="/contact"
            className="inline-flex items-center justify-center font-sans font-semibold text-sm rounded-full px-6 py-2.5 min-h-[44px] transition-colors duration-200"
            style={{
              backgroundColor: scrolled ? '#C4763A' : 'rgba(246,240,232,0.15)',
              color: '#F6F0E8',
              border: scrolled ? 'none' : '1px solid rgba(246,240,232,0.3)',
            }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = scrolled ? '#A8612E' : 'rgba(246,240,232,0.25)'}
            onMouseOut={e  => e.currentTarget.style.backgroundColor = scrolled ? '#C4763A' : 'rgba(246,240,232,0.15)'}
          >
            Partner With Us →
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden z-50 p-2 rounded-md transition-colors duration-200"
          style={{ color: mobileOpen ? '#F6F0E8' : textColor }}
          onClick={() => setMobileOpen(v => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile overlay — forest background */}
      <div
        className="fixed inset-0 md:hidden transition-all duration-500"
        style={{
          backgroundColor: '#1D2B1D',
          opacity:    mobileOpen ? 1 : 0,
          transform:  mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          pointerEvents: mobileOpen ? 'auto' : 'none',
          zIndex: 40,
        }}
      >
        <div className="flex flex-col pt-28 px-8 gap-7">
          {navigation.map(item => (
            <div key={item.name} className="flex flex-col gap-3">
              <Link
                to={item.href === '#' ? '/' : item.href}
                className="font-serif text-3xl font-semibold transition-colors duration-200"
                style={{ color: '#F6F0E8' }}
                onMouseOver={e => e.currentTarget.style.color = '#C4763A'}
                onMouseOut={e  => e.currentTarget.style.color = '#F6F0E8'}
              >
                {item.name}
              </Link>
              {item.children && (
                <div className="flex flex-col gap-2 pl-4">
                  {item.children.map(child => (
                    <Link
                      key={child.name}
                      to={child.href}
                      className="font-sans text-base transition-colors duration-200"
                      style={{ color: 'rgba(246,240,232,0.45)' }}
                      onMouseOver={e => e.currentTarget.style.color = '#F6F0E8'}
                      onMouseOut={e  => e.currentTarget.style.color = 'rgba(246,240,232,0.45)'}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center font-sans font-semibold text-sm rounded-full px-8 py-3.5 min-h-[48px] transition-colors duration-200"
              style={{ backgroundColor: '#C4763A', color: '#F6F0E8' }}
              onMouseOver={e => e.currentTarget.style.backgroundColor = '#A8612E'}
              onMouseOut={e  => e.currentTarget.style.backgroundColor = '#C4763A'}
            >
              Partner With Us →
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
