import { Router } from 'express';
import { CreatePacient,CreateVitalsPacient } from '../controllers/pacients.controllers.js';

const pacientsRouter = Router();

pacientsRouter.post('/api/v1/pacients', CreatePacient);
pacientsRouter.post('/api/v1/vitals/:patientId', CreateVitalsPacient);

export default pacientsRouter;