import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleScroll = () => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setScrollY(window.scrollY);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const parallaxOffset = scrollY * 0.3;
  const opacityFade = Math.max(0, 1 - scrollY / 600);

  return (
    <section
      id="hero"
      ref={heroRef}
      className={`relative w-full overflow-hidden grain-overlay ${isMobile ? '' : 'min-h-screen md:min-h-screen lg:min-h-screen'}`}
    >
      {/* Background Image with Parallax - Disabled on mobile */}
      {isMobile ? (
        <div className="relative w-full">
          <img
            src="/hero-gym.jpg"
            alt="Luxury dark-themed gym interior with neon accents"
            className={`w-full transition-all duration-1000 ${isLoaded ? 'scale-100 blur-0' : 'scale-110 blur-sm'
              }`}
            style={{ 
              height: 'auto',
              display: 'block'
            }}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>
      ) : (
        <div
          className="absolute inset-0 w-full h-[120%] hero-parallax"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <img
            src="/hero-gym.jpg"
            alt="Luxury dark-themed gym interior with neon accents"
            className={`w-full h-full object-cover transition-all duration-1000 ${isLoaded ? 'scale-100 blur-0' : 'scale-110 blur-sm'
              }`}
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </div>
      )}


      {/* Content */}
      <div
        className={`relative z-10 ${isMobile ? 'absolute inset-0 flex flex-col justify-between py-8' : 'flex flex-col items-center justify-center min-h-screen px-6 text-center'}`}
        style={{ opacity: opacityFade }}
      >
        {isMobile ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
            <div className="max-w-4xl mx-auto">
              {/* Headline */}
              <h1
                className={`text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight transition-all duration-1000 custom-expo ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: '0.2s', fontFamily: '"Outfit", sans-serif' }}
              >
                Forge Your
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">Legacy</span>
              </h1>

              {/* Description */}
              <p
                className={`text-base text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed transition-all duration-1000 custom-expo ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: '0.4s' }}
              >
                Experience the ultimate training environment.
                Premium equipment, expert coaching, and a community dedicated to strength.
              </p>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col items-center justify-center gap-3 transition-all duration-1000 custom-expo ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{ transitionDelay: '0.6s' }}
              >
                <a
                  href="#products"
                  className="group relative px-6 py-3 bg-cyan-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105 text-sm w-full max-w-xs"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Join Now
                    <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-cyan-700 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                </a>
                <a
                  href="#categories"
                  className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 transition-all duration-300 hover:bg-white/20 hover:scale-105 text-sm w-full max-w-xs"
                >
                  View Classes
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-6 text-center">
            {/* Headline */}
            <h1
              className={`text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight transition-all duration-1000 custom-expo ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '0.2s', fontFamily: '"Outfit", sans-serif' }}
            >
              Forge Your
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-200">Legacy</span>
            </h1>

            {/* Description */}
            <p
              className={`text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 custom-expo ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '0.4s' }}
            >
              Experience the ultimate training environment.
              Premium equipment, expert coaching, and a community dedicated to strength.
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 custom-expo ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '0.6s' }}
            >
              <a
                href="#products"
                className="group relative px-8 py-4 bg-cyan-600 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Join Now
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-cyan-700 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </a>
              <a
                href="#categories"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border border-white/30 transition-all duration-300 hover:bg-white/20 hover:scale-105"
              >
                View Classes
              </a>
            </div>
          </div>
        )}

        {/* Scroll Indicator - Hidden on mobile */}
        {!isMobile && (
          <div
            className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            style={{ transitionDelay: '1s' }}
          >
            <a
              href="#categories"
              className="flex flex-col items-center text-white/70 hover:text-white transition-colors"
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
