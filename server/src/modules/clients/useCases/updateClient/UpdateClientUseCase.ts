import { inject, injectable } from 'tsyringe';
import { Clients } from '@prisma/client';
import { IClientsRepository } from '../../repositories/IClientsRepository';
import { AppError } from '../../../../shared/errors/AppError';

interface IRequest {
  name: string;
  cpf: string;
  adress: string;
  kinship?: string;
}

@injectable()
class UpdateClientUseCase {
  constructor(@inject('ClientsRepository') private clientsRepository: IClientsRepository) {}

  async execute(id: string, { name, cpf, adress, kinship }: IRequest): Promise<Clients> {
    const client = await this.clientsRepository.findById(id);
    if (client == null) {
      throw new AppError('Client not found');
    }
    client.name = name;
    client.cpf = cpf;
    client.adress = adress;
    client.kinship = kinship;
    await this.clientsRepository.update(client);

    return client;
  }
}

export { UpdateClientUseCase };
