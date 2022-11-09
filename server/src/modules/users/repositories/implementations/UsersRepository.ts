import { Users } from '@prisma/client';
import { prisma } from '../../../../database/prismaClient';
import { ICreateUserDTO } from '../../dtos/CreateUserDTO';

class UsersRepository {
  async create({ id, name, email, password }: ICreateUserDTO): Promise<Users> {
    const user = await prisma.users.create({
      data: {
        id,
        email,
        name,
        password,
      },
    });

    return user;
  }

  async findById(id_user: string): Promise<Users | null> {
    const user = await prisma.users.findFirst({
      where: {
        id: {
          equals: id_user,
        },
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<Users | null> {
    const user = await prisma.users.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });
    return user;
  }
}

export { UsersRepository };
