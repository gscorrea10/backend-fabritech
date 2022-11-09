import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../../../config/auth';

interface IPayload {
  sub: string;
}

async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Token not present.',
    });
  }

  const [, token] = authHeader.split(' ');

  if (!token) {
    return response.status(401).json({
      error: true,
      code: 'token.invalid',
      message: 'Token not present.',
    });
  }

  try {
    const { sub: user_id } = verify(token, auth.jwt.secret) as IPayload;

    request.user = {
      id: user_id,
    };

    return next();
  } catch (err) {
    return response.status(401).json({
      error: err.name,
      code: err.message,
      message: 'Token invalid or expired',
    });
  }
}

export { ensureAuthenticated };
