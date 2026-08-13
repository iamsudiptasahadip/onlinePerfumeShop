export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  notes: {
    top: string;
    heart: string;
    base: string;
  };
  size: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}