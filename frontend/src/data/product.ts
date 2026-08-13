import { Product } from '../types/product';

export const product: Product = {
  id: 'black-umbrella',
  name: 'Black Umbrella',
  price: 3000,
  description: 'Inspired by Dior Sauvage — a fresh, spicy, and woody fragrance with Calabrian bergamot, Sichuan pepper, and Ambroxan. Wild and noble.',
  notes: {
    top: 'Bergamot, Pepper',
    heart: 'Lavender, Geranium',
    base: 'Ambroxan, Cedar',
  },
  size: '100 mL',
  image: 'https://placehold.co/400x320/1c1816/d4af37?text=Black+Umbrella',
};