import { Router } from 'express';
import * as institucionController from '../controllers/institution.controller.js';

const router = Router();

router.post('/', institucionController.createInstitucionHandler);

export default router;
