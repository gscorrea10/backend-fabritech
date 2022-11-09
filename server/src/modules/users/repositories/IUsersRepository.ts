import { Users } from '@prisma/client';
import { ICreateUserDTO } from '../dtos/CreateUserDTO';

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<Users>;
  findById(id_user: string): Promise<Users | null>;
  findByEmail(email: string): Promise<Users | null>;
}

export { IUsersRepository };
