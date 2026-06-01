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

  /* requestAnimationFrame throttled scroll listener for performance */
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60)
          ticking = false
        })
        ticking = true
      }
    }
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-sand/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]' : 'bg-transparent'}`}
    >
      <nav className="container w-full flex items-center justify-between h-20">
        {/* Logo lockup */}
        <Link to="/" className="flex flex-col leading-none z-50 group">
          <span
            className={`font-serif text-xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? 'text-forest' : 'text-sand'}`}
          >
            MPSM
          </span>
          <span
            className={`font-sans font-semibold text-[9px] tracking-[0.14em] uppercase mt-0.5 transition-colors duration-300 ${scrolled ? 'text-ink-muted' : 'text-sand/55'}`}
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
                  type="button"
                  aria-expanded={servicesOpen}
                  aria-controls="services-menu"
                  className={`flex items-center gap-1 font-sans font-medium text-sm transition-colors duration-300 ${scrolled ? 'text-forest' : 'text-sand'}`}
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
                  id="services-menu"
                  className="absolute top-full pt-2 left-1/2 -translate-x-1/2 w-64 transition-all duration-200 origin-top"
                  style={{
                    opacity:    servicesOpen ? 1 : 0,
                    transform:  servicesOpen ? 'translateX(-50%) scaleY(1)' : 'translateX(-50%) scaleY(0.95)',
                    visibility: servicesOpen ? 'visible' : 'hidden',
                    pointerEvents: servicesOpen ? 'auto' : 'none',
                  }}
                >
                  <div
                    className="rounded-xl py-2 px-1.5 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.10)]"
                  >
                    {item.children.map(child => (
                      <Link
                        key={child.name}
                        to={child.href}
                        className="block px-4 py-2.5 rounded-lg font-sans text-sm transition-colors duration-150 text-forest hover:bg-sand hover:text-clay"
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
                className={`font-sans font-medium text-sm transition-colors duration-300 hover:text-clay ${scrolled ? 'text-forest' : 'text-sand'}`}
              >
                {item.name}
              </Link>
            )
          )}

          <Link
            to="/contact"
            className={`inline-flex items-center justify-center font-sans font-semibold text-sm rounded-full px-6 py-2.5 min-h-[44px] transition-colors duration-200 text-sand ${scrolled ? 'bg-clay hover:bg-clay-dark border-transparent' : 'bg-sand/15 hover:bg-sand/25 border border-sand/30'}`}
          >
            Partner With Us →
          </Link>
        </div>

        {/* Hamburger */}
        <button
          type="button"
          className={`md:hidden z-50 p-2 rounded-md transition-colors duration-200 ${mobileOpen ? 'text-sand' : scrolled ? 'text-forest' : 'text-sand'}`}
          onClick={() => setMobileOpen(v => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile overlay — forest background */}
      <div
        id="mobile-menu"
        className="fixed inset-0 md:hidden transition-all duration-500 bg-forest"
        style={{
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
                className="font-serif text-3xl font-semibold transition-colors duration-200 text-sand hover:text-clay"
              >
                {item.name}
              </Link>
              {item.children && (
                <div className="flex flex-col gap-2 pl-4">
                  {item.children.map(child => (
                    <Link
                      key={child.name}
                      to={child.href}
                      className="font-sans text-base transition-colors duration-200 text-sand/45 hover:text-sand"
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
              className="inline-flex items-center justify-center font-sans font-semibold text-sm rounded-full px-8 py-3.5 min-h-[48px] transition-colors duration-200 bg-clay text-sand hover:bg-clay-dark"
            >
              Partner With Us →
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
