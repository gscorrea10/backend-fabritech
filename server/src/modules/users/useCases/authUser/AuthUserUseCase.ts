import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import auth from '../../../../config/auth';
import { IUsersRepository } from '../../../../modules/users/repositories/IUsersRepository';
import { IAuthUserResponseDTO } from './IAuthUserResponseDTO';
import { AppError } from '../../../../shared/errors/AppError';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthUserUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  async execute({ email, password }: IRequest): Promise<IAuthUserResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email or Password incorret');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Password incorret');
    }

    const { secret, expiresIn } = auth.jwt;

    const token = sign({ user }, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export { AuthUserUseCase };
