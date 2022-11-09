import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateClientUseCase } from './CreateClientUseCase';

class CreateClientController {
  async handle(request: Request, response: Response) {
    const { name, cpf, adress, kinship } = request.body;
    const createClientUseCase = container.resolve(CreateClientUseCase);
    const result = await createClientUseCase.execute({
      name,
      cpf,
      adress,
      kinship,
    });
    return response.status(201).json(result);
  }
}
export { CreateClientController };
