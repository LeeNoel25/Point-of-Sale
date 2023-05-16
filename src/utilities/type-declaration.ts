import { ObjectId } from 'mongodb';

export type Product = {
    _id?: ObjectId,
    name: string,
    imgurl: string,
    price: number,
    brand: string
};

export type LineItemType = {
    _id: string,
    name: string,
    imgurl: string;
    price: number;
    brand: string;
    quantity: number;
  };

  export type SaleType = {
    _id: string;
    items: LineItemType[];
    total: number;
    timestamps: string;
  };
