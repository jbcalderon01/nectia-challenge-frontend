export interface IProduct {
  _id: string;
  name: string;
  description: string;
  sku: string;
  image_url: string;
  price: number;
  quantity: number;
  created_at: Date;
}
