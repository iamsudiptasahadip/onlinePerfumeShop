import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft } from 'react-icons/fa';

export const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <>
        <h2 className="text-3xl font-serif font-light text-cream-light tracking-wide mt-6">Your Cart</h2>
        <p className="text-muted border-b border-dark-border pb-4 mb-6">Your cart is empty</p>
        <div className="text-center py-16">
          <p className="text-muted-text text-lg mb-6">Looks like you haven't added any perfumes yet.</p>
          <Link to="/shop" className="btn-primary inline-block">Start Shopping</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="text-3xl font-serif font-light text-cream-light tracking-wide mt-6">Your Cart</h2>
      <p className="text-muted border-b border-dark-border pb-4 mb-6">{items.length} item(s) in your cart</p>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 bg-dark-card p-4 rounded-xl border border-dark-border mb-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-contain bg-[#1c1816] rounded-lg p-1" />
              <div className="flex-1 text-center sm:text-left">
                <h4 className="text-cream-light font-medium">{item.name}</h4>
                <p className="text-gold font-semibold">৳{item.price.toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="bg-dark-border text-cream hover:text-gold p-2 rounded-lg transition-colors"
                >
                  <FaMinus size={12} />
                </button>
                <span className="text-cream w-8 text-center font-medium">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="bg-dark-border text-cream hover:text-gold p-2 rounded-lg transition-colors"
                >
                  <FaPlus size={12} />
                </button>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-400 p-2 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:w-80 bg-dark-card p-6 rounded-xl border border-dark-border h-fit">
          <h3 className="text-xl font-serif text-gold mb-4">Order Summary</h3>
          <div className="flex justify-between text-cream mb-2">
            <span>Subtotal</span>
            <span>৳{totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-muted mb-4 text-sm">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <div className="border-t border-dark-border pt-4 flex justify-between text-xl font-semibold text-cream-light">
            <span>Total</span>
            <span className="text-gold">৳{totalPrice.toLocaleString()}</span>
          </div>
          <button className="btn-primary w-full mt-6 text-center border-none">Proceed to Checkout</button>
          <button 
            onClick={clearCart}
            className="w-full mt-3 text-muted hover:text-red-400 text-sm transition-colors"
          >
            Clear Cart
          </button>
          <Link to="/shop" className="inline-block text-muted hover:text-gold transition-colors mt-4">
            <FaArrowLeft className="inline mr-2" /> Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
};