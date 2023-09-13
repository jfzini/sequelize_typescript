import StatusHTTP from './StatusHTTP';

export type Product = {
  id: number;
  name: string;
  price: string;
  orderId?: number;
};

export type ProductService = {
  status: keyof typeof StatusHTTP;
  data: Product | Product[];
};
