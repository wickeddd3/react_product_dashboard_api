import UserModel from '@/resources/user/user.model';
import { ObjectId } from 'mongodb';
import { User } from '@/resources/user/user.type';

class UserService {
  private user = UserModel;

  // Get all users
  public async all(filter = {}): Promise<User[] | Error> {
    try {
      const users = await this.user.aggregate([
        {
          $match: filter,
        },
      ])
      return users as User[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Create new user
  public async create(user: User): Promise<User | Error> {
    try {
      const createdUser = await this.user.create(user);

      return createdUser as User
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Update new user
  public async update(
    id: string | number,
    user: User,
  ): Promise<User | Error> {
    try {
      const updatedUser: User | null = await this.user.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: user },
        { returnOriginal: false },
      );

      return updatedUser as User
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default UserService;
