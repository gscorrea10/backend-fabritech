import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateClientUseCase } from './UpdateClientUseCase';

class UpdateClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, cpf, adress, kinship } = request.body;
    const updateClientUseCase = container.resolve(UpdateClientUseCase);
    const result = await updateClientUseCase.execute(id, { name, cpf, adress, kinship });

    return response.status(200).json(result);
  }
}

export { UpdateClientController };
