import { ObjectId } from 'mongodb';

export type Product = {
    _id?: ObjectId,
    name: string,
    imgurl: string,
    price: number,
    brand: string
};

export type Item = {
    product: ObjectId,
    quantity: number,
};

export type Sale = {
    _id?: ObjectId,
    items: Item[],
    total: number,
};
