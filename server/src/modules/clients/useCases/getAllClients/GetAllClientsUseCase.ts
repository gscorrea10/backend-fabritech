import { inject, injectable } from 'tsyringe';
import { IClientsRepository } from '../../repositories/IClientsRepository';

@injectable()
class GetAllClientsUseCase {
  constructor(
    @inject('ClientsRepository') private clientsRepository: IClientsRepository,
  ) {}
  async execute() {
    const clients = await this.clientsRepository.listAllClients();

    return clients;
  }
}

export { GetAllClientsUseCase };
