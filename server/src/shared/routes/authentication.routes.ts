import { Router } from 'express';
import { AuthUserController } from '../../modules/users/useCases/authUser/AuthUserController';

const authenticationRouter = Router();
const authUserController = new AuthUserController();

authenticationRouter.post('/authenticate', authUserController.execute);

export { authenticationRouter };
