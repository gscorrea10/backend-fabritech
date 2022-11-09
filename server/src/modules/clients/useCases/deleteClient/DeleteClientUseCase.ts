import { AppError } from '../../../../shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IClientsRepository } from '../../repositories/IClientsRepository';

@injectable()
class DeleteClientUseCase {
  constructor(@inject('ClientsRepository') private clientsRepository: IClientsRepository) {}
  async execute(id: string): Promise<void> {
    const client = await this.clientsRepository.findById(id);
    if (!client) {
      throw new AppError('Client does not exist');
    }
    await this.clientsRepository.delete(id);
  }
}

export { DeleteClientUseCase };
