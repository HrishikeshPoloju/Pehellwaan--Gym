import { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Fitness Enthusiast',
    avatar: '/avatar-sarah.jpg',
    content: 'Nomad Gym completely changed my perspective on fitness. The trainers are incredibly knowledgeable and the community is so supportive. I actually look forward to my workouts now!',
    rating: 5,
  },
  {
    id: 2,
    name: 'John Peterson',
    role: 'Competitive Lifter',
    avatar: '/avatar-john.jpg',
    content: 'As a serious lifter, finding a gym with the right equipment is tough. Nomad Gym has everything I need—calibrated plates, deadlift platforms, and plenty of racks. Absolutely world-class.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Mike Thompson',
    role: 'Marathon Runner',
    avatar: '/avatar-mike.jpg',
    content: 'The cardio deck and recovery studio are game changers for my training. Being able to combine endurance work with professional recovery tools has helped me stay injury-free.',
    rating: 5,
  },
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 bg-cream relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-sage/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 custom-expo ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <span className="inline-block px-4 py-1.5 bg-sage/10 text-sage text-sm font-medium rounded-full mb-4">
            Member Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sage-dark mb-4">
            What our members say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Join thousands of individuals who trust Nomad Gym for their fitness journey.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`relative transition-all duration-700 custom-expo ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-soft h-full card-lift">
                {/* Quote Icon */}
                <div className="absolute -top-4 -left-4 w-10 h-10 bg-sage rounded-2xl flex items-center justify-center">
                  <Quote className="w-5 h-5 text-cream" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-tan fill-tan" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground leading-relaxed mb-8">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-sage/20"
                  />
                  <div>
                    <h4 className="font-bold text-sage-dark">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div
          className={`flex flex-wrap items-center justify-center gap-8 mt-16 pt-16 border-t border-sage/10 transition-all duration-1000 custom-expo ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          style={{ transitionDelay: '0.6s' }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-sage-dark">4.9</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="w-px h-12 bg-sage/20 hidden sm:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-sage-dark">2,500+</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </div>
          <div className="w-px h-12 bg-sage/20 hidden sm:block" />
          <div className="text-center">
            <div className="text-3xl font-bold text-sage-dark">98%</div>
            <div className="text-sm text-muted-foreground">Goal Achievement</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
