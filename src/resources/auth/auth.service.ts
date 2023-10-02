import UserModel from '@/resources/user/user.model';
import OrganizationModel from '@/resources/organization/organization.model';
import { AuthResponse } from '@/resources/auth/auth.type';
import { User } from '@/resources/user/user.type';
import { Organization } from '@/resources/organization/organization.type';
import token from '@/utils/token';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcrypt';

class AuthService {
  private user = UserModel;
  private organization = OrganizationModel;

  // Register a new user
  public async register(user: User): Promise<AuthResponse | Error> {
    try {
      const createdUser = await this.user.create(user);
      const userOrganization = await this.authOrganization(createdUser?.organization || '');

      const accessToken = token.createToken(createdUser);

      return { user: createdUser, accessToken, organization: userOrganization };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Attempt to login a user
  public async login(
    email: string,
    password: string
  ): Promise<AuthResponse | Error> {
    try {
      const user = await this.user.findOne({ email });
      const userOrganization = await this.authOrganization(user?.organization || '');

      if (!user) {
        throw new Error('Unable to find user with that email address');
      }

      if (await user.isValidPassword(password)) {
        const accessToken = token.createToken(user);
        return { user, accessToken, organization: userOrganization };
      } else {
        throw new Error('Wrong credentials given');
      }
    } catch (error) {
      throw new Error('Unable to login');
    }
  }

  // Get authenticated user organization
  public async authOrganization(
    id: string | number
  ): Promise<Organization | null> {
    try {
      let query = {};
      if (id) {
        query = { _id: id };
      }
      return await this.organization.findOne(query);
    } catch (error: any) {
      throw new Error(error.message);
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
