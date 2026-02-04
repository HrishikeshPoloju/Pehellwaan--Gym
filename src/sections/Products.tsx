import { useEffect, useRef, useState } from 'react';
import { Clock, Users, Check, ArrowRight, Dumbbell } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  features: string;
  access: string;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Basic Plan',
    description: 'Start your journey with full access to our gym floor and cardio areas.',
    price: 1500,
    duration: '1 Month',
    features: 'Gym Access',
    access: 'Standard Hours',
    image: '/category-cardio.jpg',
  },
  {
    id: 2,
    name: 'Standard Plan',
    description: 'Commit to your fitness goals with our quarterly membership package.',
    price: 4000,
    duration: '3 Months',
    features: 'Quarterly',
    access: 'All Zones',
    image: '/category-strength.jpg',
  },
  {
    id: 3,
    name: 'Premium Plan',
    description: 'Maximize your potential with our half-yearly membership option.',
    price: 7500,
    duration: '6 Months',
    features: 'Half-Yearly',
    access: 'Priority Access',
    image: '/category-functional.jpg',
  },
  {
    id: 4,
    name: 'Annual Elite',
    description: 'The ultimate value for dedicated individuals. Full year access.',
    price: 13000,
    duration: '12 Months',
    features: 'Yearly Saver',
    access: 'VIP All-Access',
    image: '/about-gym.jpg',
  },
];

const Products = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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

  return (
    <section
      id="products"
      ref={sectionRef}
      className="py-24 md:py-32 bg-cream relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-sage/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end md:justify-between mb-16 transition-all duration-1000 custom-expo ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-sage/10 text-sage text-sm font-medium rounded-full mb-4">
              Membership Plans
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-sage-dark">
              Choose your path
            </h2>
          </div>
          <a
            href="#"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sage font-medium hover:gap-3 transition-all duration-300"
          >
            Compare memberships
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`transition-all duration-700 custom-expo ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              style={{ transitionDelay: `${index * 0.15}s` }}
            >
              <div
                className={`group relative bg-white rounded-3xl overflow-hidden shadow-soft transition-all duration-500 ${hoveredId !== null && hoveredId !== product.id ? 'opacity-50' : 'opacity-100'
                  }`}
                onMouseEnter={() => setHoveredId(product.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-sage-dark font-bold text-lg">₹{product.price.toLocaleString()}</span>
                    <span className="text-muted-foreground text-sm">/mo</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs bg-sage/10 text-sage px-3 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5" />
                      {product.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs bg-sage/10 text-sage px-3 py-1 rounded-full">
                      <Users className="w-3.5 h-3.5" />
                      {product.access}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs bg-sage/10 text-sage px-3 py-1 rounded-full">
                      <Dumbbell className="w-3.5 h-3.5" />
                      {product.features}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-sage-dark mb-2 group-hover:text-sage transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {product.description}
                  </p>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <div className="text-sage-dark">
                      <span className="text-3xl font-bold">₹{product.price.toLocaleString()}</span>
                      <span className="text-muted-foreground"> /mo</span>
                    </div>
                    <button className="px-6 py-3 bg-sage text-cream font-semibold rounded-full transition-all duration-300 hover:bg-sage-dark hover:shadow-lg transform group-hover:scale-105">
                      Join Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
