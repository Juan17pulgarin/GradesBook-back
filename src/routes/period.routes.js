import { Router } from 'express';
import * as periodController from '../controllers/period.controller.js';
import { validateToken, checkRole } from '../middlewares/auth.middleware.js';
import { ROLES } from '../utils/constants.js';

const router = Router();

router.post(
    '/',
    validateToken,
    checkRole([ROLES.ADMIN]),
    periodController.createPeriodHandler
);

router.get(
    '/',
    validateToken,
    checkRole([ROLES.ADMIN, ROLES.DOCENTE, ROLES.ESTUDIANTE]),
    periodController.listPeriodsHandler
);

router.patch(
    '/:id',
    validateToken,
    checkRole([ROLES.ADMIN]),
    periodController.updatePeriodHandler
);

export default router;