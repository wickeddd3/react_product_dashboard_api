import 'dotenv/config';
import 'module-alias/register';
import validateEnv from '@/utils/validateEnv';
import App from './app';
import AuthController from '@/resources/auth/auth.controller';
import UserController from '@/resources/user/user.controller';
import ProductController from '@/resources/product/product.controller';

validateEnv();

const app = new App(
  [
    new AuthController(),
    new UserController(),
    new ProductController(),
  ],
  Number(process.env.PORT)
);

app.listen();
