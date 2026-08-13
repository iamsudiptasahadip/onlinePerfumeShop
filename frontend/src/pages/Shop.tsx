import { useSearchStore } from '../store/searchStore';
import { product } from '../data/product';
import { ProductCard } from '../components/ProductCard';

export const Shop = () => {
  const { query } = useSearchStore();
  
  const matchesSearch = product.name.toLowerCase().includes(query.toLowerCase()) ||
                        product.description.toLowerCase().includes(query.toLowerCase());

  return (
    <>
      <h2 className="text-3xl font-serif font-light text-cream-light tracking-wide mt-6">Our Signature</h2>
      <p className="text-muted border-b border-dark-border pb-4 mb-6">Discover our finest creation</p>

      <div className="flex justify-center py-8">
        {matchesSearch ? (
          <ProductCard product={product} />
        ) : (
          <p className="text-muted-text text-center py-12">
            No products found matching "<span className="text-cream">{query}</span>"
          </p>
        )}
      </div>
    </>
  );
};