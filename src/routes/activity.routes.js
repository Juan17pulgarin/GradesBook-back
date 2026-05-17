import { Router } from 'express';
import * as activityController from '../controllers/activity.controller.js';
import {validateToken, checkRole} from '../middlewares/auth.middleware.js';
import { ROLES } from '../utils/constants.js';

const router = Router();

router.post(
    '/',
    validateToken,
    checkRole([ROLES.DOCENTE]),
    activityController.createActivityHandler
);

router.get(
    '/',
    validateToken,
    checkRole([ROLES.DOCENTE]),
    activityController.listActivitiesHandler
);

router.get(
    '/my-activities',
    validateToken,
    checkRole([ROLES.ESTUDIANTE]),
    activityController.listStudentActivitiesHandler
);

export default router;