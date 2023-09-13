import StatusHTTP from './StatusHTTP';

export type Product = {
  id: number;
  name: string;
  price: number;
  orderId?: number;
};

export type ProductService = {
  status: keyof typeof StatusHTTP;
  data: Product;
};
