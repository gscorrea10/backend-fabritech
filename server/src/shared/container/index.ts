import { container } from 'tsyringe';
import { UsersRepository } from '../../modules/users/repositories/implementations/UsersRepository';
import { ClientsRepository } from '../../modules/clients/repositories/implementations/ClientsRepository';
import { IUsersRepository } from '../../modules/users/repositories/IUsersRepository';
import { IClientsRepository } from '../../modules/clients/repositories/IClientsRepository';

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);

container.registerSingleton<IClientsRepository>('ClientsRepository', ClientsRepository);
