import { Document } from 'mongoose';

export default interface Project extends Document {
  name: string;
  description: string;
  organization: string;
  type: string;
  members: string[];
  prefixId: string;
  createdBy: string;
  updatedBy: string;
}
