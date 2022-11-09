import { Router } from 'express';
import { userRoutes } from './users.routes';
import { clientRoutes } from './clients.routes';
import { authenticationRouter } from './authentication.routes';

export const router = Router();

router.use('/', authenticationRouter);
router.use('/user', userRoutes);
router.use('/client', clientRoutes);
