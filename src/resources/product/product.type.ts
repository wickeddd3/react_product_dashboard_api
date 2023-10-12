export interface Product {
  _id: string | number,
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