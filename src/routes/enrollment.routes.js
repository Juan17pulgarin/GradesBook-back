import { Router } from 'express';
import * as enrollmentController from '../controllers/enrollment.controller.js';
import { validateToken, checkRole} from '../middlewares/auth.middleware.js';
import { ROLES } from '../utils/constants.js';

const router = Router();

router.post(
    '/',
    validateToken,
    checkRole([ROLES.ADMIN]),
    enrollmentController.createEnrollmentHandler
);

router.get(
    '/',
    validateToken,
    checkRole([ROLES.ADMIN]),
    enrollmentController.listEnrollmentsHandler
);

export default router;