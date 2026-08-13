import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useSearchStore } from '../store/searchStore';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';

export const Header = () => {
  const navigate = useNavigate();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { query, setQuery } = useSearchStore();

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between py-4 border-b border-[rgba(212,175,55,0.2)] gap-4">
      <div 
        className="text-3xl font-serif font-semibold text-gold uppercase tracking-wider cursor-pointer"
        onClick={() => navigate('/')}
      >
        Perfumology
      </div>

      <nav className="flex gap-6 md:gap-10 text-base font-medium">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/shop" className="nav-link">Shop Now</Link>
        <Link to="/contact" className="nav-link">Contact Us</Link>
      </nav>

      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-[#1a1715] text-cream px-4 py-2 pr-10 rounded-lg border border-dark-border focus:border-gold focus:outline-none transition-colors w-36 md:w-48 text-sm"
          />
          <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-sm" />
        </div>
        <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
          <FaShoppingCart className="text-2xl text-cream hover:text-gold transition-colors" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-gold text-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
      </div>
    </header>
  );
};