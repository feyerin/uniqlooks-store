export interface Brand {
  id: string;
  name: string;
  logoUrl: string;
}

export interface Product {
  id: string;
  brandId: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  brandId: string;
  selectedSize?: string;
}