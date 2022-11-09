import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteClientUseCase } from './DeleteClientUseCase';

class DeleteClientController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const deleteClientUseCase = container.resolve(DeleteClientUseCase);
      await deleteClientUseCase.execute(id);

      return response.status(204).send();
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export { DeleteClientController };
