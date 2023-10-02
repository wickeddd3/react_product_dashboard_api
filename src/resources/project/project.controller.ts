import { Router, Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middlewares/validation.middleware';
import authenticated from '@/middlewares/authenticated.middleware';
import validate from '@/resources/project/project.validation';
import ProjectService from '@/resources/project/project.service';
import BoardService from '@/resources/board/board.service';
import { Project } from '@/resources/project/project.type';
import { Board } from '@/resources/board/board.type';

class ProjectController implements Controller {
  public path = '/projects';
  public router = Router();
  private ProjectService = new ProjectService();
  private BoardService = new BoardService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.get(
      `${this.path}`,
      authenticated,
      this.all
    );
    this.router.post(
      `${this.path}`,
      [
        authenticated,
        validationMiddleware(validate.create)
      ],
      this.create
    );
    this.router.put(
      `${this.path}/:id`,
      [
        authenticated,
        validationMiddleware(validate.update)
      ],
      this.update
    );
    this.router.get(
      `${this.path}/primary`,
      authenticated,
      this.primary
    );
  }

  private all = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const filter = { organization: req.user?.organization };
      const projects  = await this.ProjectService.all(filter);
      res.status(200).json(projects);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const body = req.body;
      const { organization, _id } = req.user;
      const data = {
        ...body,
        organization,
        createdBy: _id,
      };
      const createdProject  = await this.ProjectService.create(data);

      res.status(201).json(createdProject);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private update = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const { organization, _id } = req.user;
      const body = req.body;
      const data = {
        ...body,
        organization,
        updatedBy: _id,
      };
      const updatedProject  = await this.ProjectService.update(id, data);

      res.status(200).json(updatedProject);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private primary = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const projectsFilter = { organization: req.user?.organization };
      const projects  = await this.ProjectService.all(projectsFilter);
      let project: Project | string = '';
      let board: Board | string  = '';
      let boards: Board[] | string = '';

      if (projects) {
        project = (projects as Project[])[0] as Project;
      }

      if (project) {
        const { organization } = req.user;
        const projectId = (project as Project)?._id;
        const boardsFilter = {
          organization: new ObjectId(organization),
          project: new ObjectId(projectId),
        };
        boards = await this.BoardService.all(boardsFilter) as Board[];
        const primaryBoard = (boards as Board[])[0] as Board;
        const primaryBoardId = primaryBoard?._id;
        const primaryBoardDetails = await this.BoardService.get(primaryBoardId);
        board = primaryBoardDetails as Board;
      }

      const current = {
        project,
        board,
        projects,
        boards,
      };
      res.status(200).json(current);
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default ProjectController;
