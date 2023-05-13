import { ObjectId } from 'mongodb';

export type Fruit = {
    _id?: ObjectId,
    name: string,
    imgurl: string,
    price: number,
    category: string
};

export type Item = {
    fruit: ObjectId,
    quantity: number,
};

export type Sale = {
    _id?: ObjectId,
    items: Item[],
    total: number,
};
