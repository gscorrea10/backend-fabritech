import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { GetAllClientsUseCase } from './GetAllClientsUseCase';

class GetAllClientsController {
  async handle(request: Request, response: Response) {
    const getAllClientsUseCase = container.resolve(GetAllClientsUseCase);
    const result = await getAllClientsUseCase.execute();

    return response.json(result);
  }
}

export { GetAllClientsController };
