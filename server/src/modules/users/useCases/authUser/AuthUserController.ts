import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { AuthUserUseCase } from './AuthUserUseCase';

class AuthUserController {
  async execute(request: Request, response: Response) {
    const { email, password } = request.body;
    const authUserUseCase = container.resolve(AuthUserUseCase);

    const { user, token } = await authUserUseCase.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}

export { AuthUserController };
