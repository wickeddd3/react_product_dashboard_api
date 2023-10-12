import { Document } from 'mongoose';

export default interface Product extends Document {
  name: string;
  description: string;
  code: string;
  sku: string;
  quantity: string;
  category: string;
  tags: string[];
  regularPrice: string;
  salePrice: string;
  image: string;
  createdBy: string;
  updatedBy: string;
}
