import { Router, Request, Response, NextFunction } from 'express';
import { v2 as cloudinary } from 'cloudinary';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middlewares/validation.middleware';
import authenticated from '@/middlewares/authenticated.middleware';
import validate from '@/resources/product/product.validation';
import ProductService from '@/resources/product/product.service';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class ProductController implements Controller {
  public path = '/products';
  public router = Router();
  private ProductService = new ProductService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.get(
      `${this.path}`,
      authenticated,
      this.all
    );
    this.router.post(
      `${this.path}`,
      [
        authenticated,
        validationMiddleware(validate.create)
      ],
      this.create
    );
    this.router.put(
      `${this.path}/:id`,
      [
        authenticated,
        validationMiddleware(validate.update)
      ],
      this.update
    );
  }

  private all = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const products  = await this.ProductService.all();
      res.status(200).json(products);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const body = req.body;
      const { _id } = req.user;
      let photoUrl;
      if(body.image) {
        photoUrl = await cloudinary.uploader.upload(body.image);
      }
      const data = {
        ...body,
        image: photoUrl?.url ?? '',
        createdBy: _id,
      };
      const createdProduct  = await this.ProductService.create(data);

      res.status(201).json(createdProduct);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const { _id } = req.user;
      const body = req.body;
      let photoUrl;
      if(body.image) {
        photoUrl = await cloudinary.uploader.upload(body.image);
      }
      const data = {
        ...body,
        image: photoUrl?.url ?? '',
        updatedBy: _id,
      };
      const updatedProduct  = await this.ProductService.update(id, data);

      res.status(200).json(updatedProduct);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default ProductController;
