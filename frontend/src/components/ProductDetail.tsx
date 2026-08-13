import { Link } from 'react-router-dom';
import { product } from '../data/product';
import { useCartStore } from '../store/cartStore';
import { FaArrowLeft } from 'react-icons/fa';

export const ProductDetail = () => {
  const addToCart = useCartStore((state) => state.addToCart);
  const p = product;

  if (!p) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-cream">Product not found</h2>
        <Link to="/shop" className="text-gold hover:underline mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }

  return (
    <>
      <Link to="/shop" className="inline-block text-muted hover:text-gold transition-colors mt-4">
        <FaArrowLeft className="inline mr-2" /> Back to Shop
      </Link>

      <div className="flex flex-col lg:flex-row gap-8 mt-6">
        <div className="flex-1 bg-dark-card rounded-2xl p-8 text-center border border-dark-border">
          <img 
            src={p.image} 
            alt={p.name} 
            className="w-full h-80 object-contain rounded-lg"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-serif font-normal text-cream-light">{p.name}</h2>
          <p className="text-2xl text-gold font-semibold mt-2">৳{p.price.toLocaleString()}</p>
          <p className="text-muted-text leading-relaxed mt-4 text-base">{p.description}</p>

          <div className="bg-dark-card p-4 rounded-xl border border-dark-border mt-6">
            <h4 className="text-gold font-normal tracking-wide text-lg">Fragrance Notes</h4>
            <p className="text-muted-text leading-relaxed mt-2">
              <strong>Top:</strong> {p.notes.top}<br />
              <strong>Heart:</strong> {p.notes.heart}<br />
              <strong>Base:</strong> {p.notes.base}
            </p>
          </div>

          <p className="text-muted mt-4"><span className="text-cream font-medium">Size:</span> {p.size}</p>

          <button 
            onClick={() => addToCart(p)}
            className="btn-primary w-full mt-6 text-center"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};