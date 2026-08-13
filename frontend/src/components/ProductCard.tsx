import { Link } from 'react-router-dom';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="bg-dark-card rounded-2xl p-8 text-center max-w-sm w-full border border-dark-border hover:border-gold/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-56 object-contain rounded-lg bg-[#1c1816] p-2"
      />
      <h3 className="text-2xl font-serif font-normal text-cream-light mt-4">{product.name}</h3>
      <p className="text-xl text-gold font-semibold mt-1">৳{product.price.toLocaleString()}</p>
      <Link to={`/product/${product.id}`} className="block mt-4">
        <button className="btn-primary w-full">View Details</button>
      </Link>
    </div>
  );
};