import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

const Home        = lazy(() => import('./pages/Home'))
const Contact     = lazy(() => import('./pages/Contact'))
const ITConsulting = lazy(() => import('./pages/ITConsulting'))
const Water       = lazy(() => import('./pages/Water'))
const Procurement = lazy(() => import('./pages/Procurement'))
const Energy      = lazy(() => import('./pages/Energy'))

const TITLES = {
  '/':              'MPSM Services — Innovative Services for a Sustainable Future',
  '/it-consulting': 'IT Consulting & Infrastructure — MPSM Services',
  '/water':         'Water Purification & Beverage Supply — MPSM Services',
  '/procurement':   'Procurement as a Service — MPSM Services',
  '/energy':        'Energy Solutions — MPSM Services',
  '/contact':       'Contact — MPSM Services',
}

function AppRoutes() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = TITLES[pathname] || 'MPSM Services'
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#1D2B1D' }} />}>
      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/it-consulting" element={<ITConsulting />} />
        <Route path="/water"         element={<Water />} />
        <Route path="/procurement"   element={<Procurement />} />
        <Route path="/energy"        element={<Energy />} />
        <Route path="/contact"       element={<Contact />} />
      </Routes>
    </Suspense>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  )
}
