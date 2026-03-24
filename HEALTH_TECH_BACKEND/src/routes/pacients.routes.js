import { Router } from 'express';
import { CreatePacient } from '../controllers/pacients.controllers.js';

const pacientsRouter = Router();

pacientsRouter.post('/api/v1/pacients', CreatePacient);

export default pacientsRouter;