import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { navigation } from '../../data/navigation';
import Button from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const navbarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    const st = ScrollTrigger.create({
      start: 'top -80',
      onUpdate: (self) => {
        if (self.isActive) {
          navbar.style.backgroundColor = 'rgba(247,243,238,0.95)';
          navbar.style.backdropFilter = 'blur(12px)';
          navbar.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
        } else {
          navbar.style.backgroundColor = 'transparent';
          navbar.style.backdropFilter = 'none';
          navbar.style.boxShadow = 'none';
        }
      }
    });

    return () => st.kill();
  }, []);

  return (
    <header 
      ref={navbarRef}
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300"
    >
      <nav className="mx-auto max-w-[var(--max-content-width)] px-6 md:px-12 lg:px-16 flex items-center justify-between h-24">
        {/* Logo */}
        <Link to="/" className="flex flex-col z-50 group leading-none">
          <span className="font-serif text-2xl font-bold tracking-tight transition-colors duration-200" style={{ color: '#1D2B1D' }}
            onMouseOver={e => e.currentTarget.style.color = '#C4763A'}
            onMouseOut={e  => e.currentTarget.style.color = '#1D2B1D'}>
            MPSM
          </span>
          <span className="font-sans font-semibold text-[9px] tracking-[0.14em] uppercase mt-0.5" style={{ color: '#8A9A82' }}>
            Services
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            item.children ? (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className="flex items-center gap-1 py-2 font-sans font-medium text-sm transition-colors duration-200"
                  style={{ color: '#1D2B1D' }}
                  onMouseOver={e => e.currentTarget.style.color = '#C4763A'}
                  onMouseOut={e  => e.currentTarget.style.color = '#1D2B1D'}
                >
                  {item.name}
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {/* Dropdown */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 w-64 rounded-xl py-2 px-1.5 transition-all duration-200 origin-top ${
                    servicesOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                  }`}
                  style={{ backgroundColor: '#FFFFFF', boxShadow: '0 8px 32px rgba(0,0,0,0.08)' }}
                >
                  {item.children.map((child) => (
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
            ) : (
              <Link
                key={item.name}
                to={item.href}
                className="font-sans font-medium text-sm transition-colors duration-200"
                style={{ color: '#1D2B1D' }}
                onMouseOver={e => e.currentTarget.style.color = '#C4763A'}
                onMouseOut={e  => e.currentTarget.style.color = '#1D2B1D'}
              >
                {item.name}
              </Link>
            )
          ))}

          <Button variant="primary" to="/contact">
            Partner With Us →
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden z-50 p-2 transition-colors duration-200"
          style={{ color: '#1D2B1D' }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-transform duration-500 ease-in-out md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: '#1D2B1D' }}
      >
        <div className="flex flex-col pt-32 px-8 gap-8">
          {navigation.map((item) => (
            <div key={item.name} className="flex flex-col gap-4">
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
                <div className="flex flex-col gap-3 pl-5">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      to={child.href}
                      className="font-sans text-base transition-colors duration-200"
                      style={{ color: 'rgba(246,240,232,0.5)' }}
                      onMouseOver={e => e.currentTarget.style.color = '#F6F0E8'}
                      onMouseOut={e  => e.currentTarget.style.color = 'rgba(246,240,232,0.5)'}
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mt-4">
            <Button variant="primary" to="/contact">
              Partner With Us
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
