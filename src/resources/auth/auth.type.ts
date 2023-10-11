import { User } from '@/resources/user/user.type';

export interface AuthResponse {
  user: User,
  accessToken: string,
}