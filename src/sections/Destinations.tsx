import { useEffect, useRef, useState } from 'react';
import { MapPin, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Destination {
  id: number;
  name: string;
  location: string;
  rating: number;
  image: string;
  description: string;
}

const destinations: Destination[] = [
  {
    id: 1,
    name: 'Strength Training',
    location: '6:00 – 7:00 AM',
    rating: 5.0,
    image: '/category-strength.jpg',
    description: 'Start your morning with power-focused compound movements.',
  },
  {
    id: 2,
    name: 'Fat Loss / HIIT',
    location: '7:00 – 8:00 AM',
    rating: 4.9,
    image: '/category-functional.jpg',
    description: 'High-intensity interval training to burn calories locally.',
  },
  {
    id: 3,
    name: 'Functional Training',
    location: '8:00 – 9:00 AM',
    rating: 4.8,
    image: '/category-recovery.jpg',
    description: 'Improve mobility and functional strength for daily life.',
  },
  {
    id: 4,
    name: 'Weight Training',
    location: '5:00 – 6:00 PM',
    rating: 5.0,
    image: '/about-gym.jpg',
    description: 'Evening session focused on hypertrophy and conditioning.',
  },
  {
    id: 5,
    name: 'Cardio & Core',
    location: '6:00 – 7:00 PM',
    rating: 4.8,
    image: '/category-cardio.jpg',
    description: 'Endurance work combined with core stability exercises.',
  },
  {
    id: 6,
    name: 'Muscle Building',
    location: '7:00 – 8:00 PM',
    rating: 4.9,
    image: '/category-strength.jpg',
    description: 'Advanced techniques for muscle growth and sculpting.',
  },
];

const Destinations = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
      setTimeout(checkScrollButtons, 300);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons();
      return () => container.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  return (
    <section
      id="destinations"
      ref={sectionRef}
      className="py-24 md:py-32 bg-sage-dark relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between mb-12 transition-all duration-1000 custom-expo ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-white/10 text-cream text-sm font-medium rounded-full mb-4">
              Timetable
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-cream">
              Class Schedule
            </h2>
            <p className="text-cream/70 mt-4 max-w-lg">
              Monday – Saturday. Join our expert-led sessions designed to push your limits.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-6 md:mt-0">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full border-2 border-cream/30 flex items-center justify-center transition-all duration-300 ${canScrollLeft
                ? 'text-cream hover:bg-cream hover:text-sage-dark'
                : 'text-cream/30 cursor-not-allowed'
                }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full border-2 border-cream/30 flex items-center justify-center transition-all duration-300 ${canScrollRight
                ? 'text-cream hover:bg-cream hover:text-sage-dark'
                : 'text-cream/30 cursor-not-allowed'
                }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Polaroid Gallery */}
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto pb-8 px-6 scrollbar-hide horizontal-scroll"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {destinations.map((destination, index) => (
          <div
            key={destination.id}
            className={`flex-shrink-0 w-72 transition-all duration-700 custom-expo ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <a href="#" className="block group">
              {/* Polaroid Frame */}
              <div className="polaroid rounded-sm rotate-0 hover:rotate-1 transition-transform duration-300">
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                  {/* Rating Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-tan fill-tan" />
                    <span className="text-sm font-semibold text-sage-dark">{destination.rating}</span>
                  </div>
                </div>

                {/* Caption */}
                <div className="p-4 pt-3">
                  <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-xs">{destination.location}</span>
                  </div>
                  <h3 className="font-bold text-sage-dark text-lg group-hover:text-sage transition-colors">
                    {destination.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {destination.description}
                  </p>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Hide scrollbar style */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Destinations;
