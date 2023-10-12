import { Schema, model } from 'mongoose';
import Product from '@/resources/product/product.interface';

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    code: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
    },
    quantity: {
      type: String,
    },
    category: {
      type: String,
    },
    tags: {
      type: [String],
    },
    regularPrice: {
      type: String,
    },
    salePrice: {
      type: String,
    },
    image: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    updatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<Product>('Product', ProductSchema);
