import 'reflect-metadata';
import { inject, injectable } from 'tsyringe';
import { hash } from 'bcrypt';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from '../../dtos/CreateUserDTO';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  async execute({ name, email, password }: ICreateUserDTO) {
    if (!(name && email && password)) {
      throw new AppError('Invalid parameters');
    }

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError('User already exists');
    }

    const hashPassword = await hash(password, 10);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    delete user.password;

    return user;
  }
}

export { CreateUserUseCase };
