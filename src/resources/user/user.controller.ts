import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middlewares/validation.middleware';
import authenticated from '@/middlewares/authenticated.middleware';
import validate from '@/resources/user/user.validation';
import UserService from '@/resources/user/user.service';

class UserController implements Controller {
  public path = '/users';
  public router = Router();
  private UserService = new UserService();

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
      `${this.path}`,
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
      const filter = { organization: req.user?.organization };
      const users  = await this.UserService.all(filter);
      res.status(200).json(users);
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
      const request = req.body;
      const { organization } = req.user;

      const createdUser  = await this.UserService.create({
        ...request,
        organization,
      });

      res.status(201).json(createdUser);
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
      const body = req.body;

      const updatedUser  = await this.UserService.update(
        id,
        body,
      );

      res.status(200).json(updatedUser);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default UserController;
