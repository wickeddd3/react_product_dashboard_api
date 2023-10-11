import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middlewares/validation.middleware';
import validate from '@/resources/auth/auth.validation';
import AuthService from '@/resources/auth/auth.service';
import authenticated from '@/middlewares/authenticated.middleware';

class AuthController implements Controller {
  public path = '/auth';
  public router = Router();
  private AuthService = new AuthService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.login),
      this.login
    );
    this.router.get(
      `${this.path}/current`,
      authenticated,
      this.current
    );
    this.router.put(
      `${this.path}/profile`,
      [
        authenticated,
        validationMiddleware(validate.profile),
      ],
      this.profile
    )
    this.router.put(
      `${this.path}/profile/password`,
      [
        authenticated,
        validationMiddleware(validate.password),
      ],
      this.password
    )
  }

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { email, password } = req.body;

      const response = await this.AuthService.login(email, password);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).send({ errors: [error.message] });
    }
  };

  private current = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      if (!req.user) {
        return next(new HttpException(404, 'No logged in user'));
      }
      res.status(200).send({ user: req.user });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private profile = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      if (!req.user) {
        return next(new HttpException(404, 'No logged in user'));
      }
      const body = req.body;
      const { _id } = req.user;
      const response = await this.AuthService.profile(_id, body);
      res.status(200).send(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  }

  private password = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      if (!req.user) {
        return next(new HttpException(404, 'No logged in user'));
      }
      const body = req.body;
      const { _id } = req.user;
      const response = await this.AuthService.password(_id, body);
      res.status(200).send(response);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  }
}

export default AuthController;
