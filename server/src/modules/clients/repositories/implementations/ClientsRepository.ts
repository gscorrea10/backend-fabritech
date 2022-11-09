import { Clients } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';
import { ICreateClientDTO } from '../../dtos/ICreateClientDTO';
import { IUpdateClientDTO } from '../../dtos/IUpdateClientDTO';
import { IClientsRepository } from '../IClientsRepository';

class ClientsRepository implements IClientsRepository {
  async create({ name, cpf, adress, kinship }: ICreateClientDTO) {
    const client = await prisma.clients.create({
      data: {
        name,
        cpf,
        adress,
        kinship,
        updated_at: null,
      },
    });

    return client;
  }

  async listAllClients(): Promise<Clients[]> {
    const clients = await prisma.clients.findMany({
      select: {
        id: true,
        name: true,
        cpf: true,
        adress: true,
        created_at: true,
        kinship: true,
        updated_at: true,
      },
    });
    return clients;
  }

  async findById(id: string): Promise<Clients | null> {
    const client = await prisma.clients.findUnique({
      where: {
        id,
      },
    });
    return client;
  }

  async update(data: IUpdateClientDTO): Promise<Clients> {
    const client = await prisma.clients.update({
      where: {
        id: data.id,
      },
      data: {
        name: data.name,
        cpf: data.cpf,
        adress: data.adress,
        kinship: data.kinship,
        updated_at: data.updated_at,
      },
    });

    return client;
  }

  async delete(id: string): Promise<void> {
    await prisma.clients.delete({
      where: {
        id,
      },
    });
  }

  async findByCpf(cpf: string): Promise<Clients> {
    const client = await prisma.clients.findUnique({
      where: {
        cpf,
      },
    });

    return client;
  }

}

export { ClientsRepository };
