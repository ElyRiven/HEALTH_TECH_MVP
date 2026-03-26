import { Router } from 'express';
import { GetPacient, CreatePacient, CreateVitalsPacient } from '../controllers/pacients.controllers.js';

const pacientsRouter = Router();

pacientsRouter.get('/api/v1/pacients/:id', GetPacient);
pacientsRouter.post('/api/v1/pacients', CreatePacient);
pacientsRouter.post('/api/v1/vitals/:patientId', CreateVitalsPacient);

export default pacientsRouter;