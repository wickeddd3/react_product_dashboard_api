import { User } from '@/resources/user/user.type';
import { Organization } from '@/resources/organization/organization.type';

export interface AuthResponse {
  user: User,
  accessToken: string,
  organization: Organization | null,
}