import { Schema, model } from 'mongoose';
import Project from '@/resources/project/project.interface';

const ProjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    organization: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    members: {
      type: [Schema.Types.ObjectId],
    },
    prefixId: {
      type: String,
    },
    createdBy: {
      type: String,
    },
    updatedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

export default model<Project>('Project', ProjectSchema);
