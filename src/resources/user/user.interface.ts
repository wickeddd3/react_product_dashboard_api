import { Document } from 'mongoose';

export default interface User extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  organization: string,
  avatar: string,
  isValidPassword(password: string): Promise<Error | boolean>;
}
