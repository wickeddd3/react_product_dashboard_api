import ProjectModel from '@/resources/project/project.model';
import { ObjectId } from 'mongodb';
import { Project } from '@/resources/project/project.type';

class ProjectService {
  private project = ProjectModel;

  // Get all projects
  public async all(filter = {}): Promise<Project[] | Error> {
    try {
      const projects = await this.project.aggregate([
        {
          $match: filter,
        },
        {
          $lookup: {
            from: 'users',
            localField: 'members',
            foreignField: '_id',
            as: 'members',
          },
        },
      ])
      return projects as Project[];
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Create new project
  public async create(project: Project): Promise<Project | Error> {
    try {
      const createdProject = await this.project.create(project);

      return createdProject as Project
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Update new project
  public async update(
    id: string | number,
    project: Project,
  ): Promise<Project | Error> {
    try {
      const updatedProject: Project | null = await this.project.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: project },
        { returnOriginal: false },
      );

      return updatedProject as Project
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default ProjectService;
