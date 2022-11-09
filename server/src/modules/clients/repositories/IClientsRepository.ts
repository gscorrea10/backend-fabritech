import { Clients } from '@prisma/client';
import { ICreateClientDTO } from '../dtos/ICreateClientDTO';
import { IUpdateClientDTO } from '../dtos/IUpdateClientDTO';

interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<Clients>;
  listAllClients(): Promise<Clients[]>;
  findById(id: string): Promise<Clients | null>;
  update(data: IUpdateClientDTO): Promise<Clients>;
  delete(id: string): Promise<void>;
  findByCpf(cpf: string): Promise<Clients>;
}

export { IClientsRepository };
