export interface Project {
  _id: string | number,
  name: string;
  description: string;
  organization: string;
  type: string;
  members: string[];
  prefixId: string;
  createdBy: string;
  updatedBy: string;
}