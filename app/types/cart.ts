export type Cart = {
  id: number;
  user_id: number;
  product_id: number;
  store_id: number;
  quantity: number;
  active: boolean;
  created_at: Date;
  store: {
    id: number;
    name: string;
  };
  total: number;
  items: {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }[];
};