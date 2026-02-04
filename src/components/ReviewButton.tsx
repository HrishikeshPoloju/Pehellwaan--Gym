import { Star } from 'lucide-react';

const ReviewButton = () => {
    return (
        <a
            href="#testimonials"
            className="fixed top-24 right-4 z-40 group md:top-32 md:right-8"
        >
            <div className="relative overflow-hidden rounded-full bg-white/10 p-[1px] shadow-lg transition-all duration-300 hover:shadow-sage/30 hover:scale-105 active:scale-95 backdrop-blur-sm">
                <div className="relative flex items-center gap-2 rounded-full bg-black/10 backdrop-blur-md px-5 py-2.5 ring-1 ring-white/10 transition-all duration-300 group-hover:bg-black/20">
                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" />

                    <Star className="w-4 h-4 text-cream fill-cream/50 animate-pulse" />
                    <span className="text-sm font-bold text-cream tracking-wide text-shadow">
                        Leave a Review
                    </span>
                </div>
            </div>
        </a>
    );
};

export default ReviewButton;
