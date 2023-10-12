import ProductModel from '@/resources/product/product.model';
import { ObjectId } from 'mongodb';
import { Product } from '@/resources/product/product.type';

class ProductService {
  private product = ProductModel;

  // Get all products
  public async all(filter = {}): Promise<Product[] | Error> {
    try {
      const products = await this.product.aggregate([
        {
          $match: filter,
        },
      ])
      return products as Product[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Create new product
  public async create(product: Product): Promise<Product | Error> {
    try {
      const createdProduct = await this.product.create(product);

      return createdProduct as Product
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Update new product
  public async update(
    id: string | number,
    product: Product,
  ): Promise<Product | Error> {
    try {
      const updatedProduct: Product | null = await this.product.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: product },
        { returnOriginal: false },
      );

      return updatedProduct as Product
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default ProductService;
