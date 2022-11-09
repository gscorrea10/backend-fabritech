import { Router } from 'express';
import { UpdateClientController } from '../../modules/clients/useCases/updateClient/UpdateClientController';
import { CreateClientController } from '../../modules/clients/useCases/createClient/CreateClientController';
import { GetAllClientsController } from '../../modules/clients/useCases/getAllClients/GetAllClientsController';
import { DeleteClientController } from '../../modules/clients/useCases/deleteClient/DeleteClientController';
import { ensureAuthenticated } from '../middlewares/auth/ensureAuthenticated';

const clientRoutes = Router();

const createClientController = new CreateClientController();
const getAllClientsController = new GetAllClientsController();
const updateClientController = new UpdateClientController();
const deleteClientController = new DeleteClientController();

clientRoutes.post('/', ensureAuthenticated, createClientController.handle);
clientRoutes.get('/all', ensureAuthenticated, getAllClientsController.handle);
clientRoutes.patch('/update/:id', ensureAuthenticated, updateClientController.handle);
clientRoutes.delete('/:id', ensureAuthenticated, deleteClientController.handle);

export { clientRoutes };
