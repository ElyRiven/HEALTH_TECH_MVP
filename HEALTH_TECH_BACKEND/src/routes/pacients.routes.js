import { Router } from 'express';
import { GetPacient, CreatePacient, CreateVitalsPacient, GetAllPacients } from '../controllers/pacients.controllers.js';

const pacientsRouter = Router();

pacientsRouter.post('/api/v1/pacients', CreatePacient);
pacientsRouter.post('/api/v1/vitals/:patientId', CreateVitalsPacient);
pacientsRouter.get('/api/v1/pacients/:id', GetPacient);
pacientsRouter.get('/api/v1/pacients', GetAllPacients);

export default pacientsRouter;