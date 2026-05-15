import React from 'react';
import Hero from '../components/home/Hero';
import AboutSnapshot from '../components/home/AboutSnapshot';
import DivisionsShowcase from '../components/home/DivisionsShowcase';
import Advantage from '../components/home/Advantage';
import StatsSection from '../components/home/StatsSection';
import CTABanner from '../components/home/CTABanner';

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSnapshot />
      <DivisionsShowcase />
      <Advantage />
      <StatsSection />
      <CTABanner />
    </>
  );
}
