export type ProductType = {
  _id?: string,
  name: string,
  imgurl: string;
  price: number;
  brand: string;
  quantity?: number;
};

export type SaleType = {
  _id: string;
  items: ProductType[];
  total: number;
  timestamps: string;
};
