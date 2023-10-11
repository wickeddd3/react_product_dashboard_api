import UserModel from '@/resources/user/user.model';
import { AuthResponse } from '@/resources/auth/auth.type';
import { User } from '@/resources/user/user.type';
import token from '@/utils/token';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

class AuthService {
  private user = UserModel;

  // Attempt to login a user
  public async login(
    email: string,
    password: string
  ): Promise<AuthResponse | Error> {
    try {
      const user = await this.user.findOne({ email });

      if (!user) {
        throw new Error('Unable to find user with that email address');
      }

      if (await user.isValidPassword(password)) {
        const accessToken = token.createToken(user);
        return { user, accessToken };
      } else {
        throw new Error('Wrong credentials given');
      }
    } catch (error) {
      throw new Error('Unable to login');
    }
  }

  // Update authenticated user profile
  public async profile(
    id: string |number,
    user: User
  ): Promise<User | null> {
    try {
      const updatedProfile: User | null = await this.user.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: user },
        { returnOriginal: false },
      );
      return updatedProfile;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Update authenticated user profile password
  public async password(
    id: string | number,
    user: User
  ): Promise<User | null> {
    try {
      const hash = await bcrypt.hash(user.password, 10);
      const updatedUser = user;
      updatedUser.password = hash;
      const updatedProfilePassword: User | null = await this.user.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updatedUser },
        { returnOriginal: false },
      );
      return updatedProfilePassword;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default AuthService;
