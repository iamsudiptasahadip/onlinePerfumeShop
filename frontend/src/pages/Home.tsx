import { Hero } from '../components/Hero';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <>
      <Hero />

      <div className="flex flex-col md:flex-row gap-8 md:gap-16 mt-12 pt-12 border-t border-[rgba(212,175,55,0.15)]">
        <div className="flex-2 min-w-[260px]">
          <h2 className="text-2xl md:text-3xl font-serif font-normal text-gold tracking-wide mb-4">
            About us
          </h2>
          <p className="text-muted-text leading-relaxed">
            Perfumology is a fast-growing fragrance house from Bangladesh, currently leading across 8 cities
            with plans to expand nationwide and internationally. All perfumes are legally manufactured in Bangladesh
            at our own factory in the BSCIC area of Jashore, where we import our own customized fragrance oils
            and blend them to create premium-quality perfumes.
          </p>
        </div>

        <div className="flex-1 min-w-[180px]">
          <h3 className="text-xl md:text-2xl font-serif font-normal text-gold tracking-wide mb-4">
            Quick Links
          </h3>
          <Link to="/" className="block text-cream hover:text-gold transition-colors mb-3 text-lg">Home</Link>
          <Link to="/shop" className="block text-cream hover:text-gold transition-colors mb-3 text-lg">Shop Now</Link>
          <Link to="/contact" className="block text-cream hover:text-gold transition-colors mb-3 text-lg">Contact Us</Link>
        </div>
      </div>
    </>
  );
};