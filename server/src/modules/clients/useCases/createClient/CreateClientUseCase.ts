import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/errors/AppError';
import { ICreateClientDTO } from '../../dtos/ICreateClientDTO';
import { IClientsRepository } from '../../repositories/IClientsRepository';

@injectable()
class CreateClientUseCase {
  constructor(@inject('ClientsRepository') private clientsRepository: IClientsRepository) { }
  async execute({ name, cpf, adress, kinship }: ICreateClientDTO) {
    const clientAlreadyExists = await this.clientsRepository.findByCpf(cpf);

    if (clientAlreadyExists) {
      throw new AppError('Client already exists');
    }

    const client = await this.clientsRepository.create({
      name,
      cpf,
      adress,
      kinship,
    });
    return client;
  }
}

export { CreateClientUseCase };
