import { Users } from '@prisma/client';

interface IAuthUserResponseDTO {
  token: string;
  user: Pick<Users, 'id' | 'email' | 'name'>;
}

export { IAuthUserResponseDTO };
