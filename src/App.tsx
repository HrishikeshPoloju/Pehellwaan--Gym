import { useState, useEffect } from 'react';
import Navigation from './sections/Navigation';
import ScrollHeroCanvas from './components/ScrollHeroCanvas';
import Categories from './sections/Categories';
import About from './sections/About';
import Products from './sections/Products';
import Destinations from './sections/Destinations';
import Testimonials from './sections/Testimonials';
import CTA from './sections/CTA';
import Footer from './sections/Footer';

import ReviewButton from './components/ReviewButton';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      <Navigation scrollY={scrollY} />
      <ReviewButton />
      <ScrollHeroCanvas />
      <div className="relative z-10 bg-cream">
        <Categories />
        <About />
        <Products />
        <Destinations />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </div>
  );
}

export default App;
