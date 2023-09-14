export type Order = {
  id: number;
  userId: number;
  productIds?: { id: number }[] | number[];
};

export type CreateOrder =
  | {
    userId: number;
    productIds: number[];
  }
  | {
    message: string;
  };
