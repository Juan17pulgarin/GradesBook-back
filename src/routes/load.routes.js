import { Router } from 'express';
import * as academicLoadController from '../controllers/load.controller.js';
import {validateToken, checkRole} from '../middlewares/auth.middleware.js';
import { ROLES } from '../utils/constants.js';

const router = Router();

router.post(
    '/',
    validateToken,
    checkRole([ROLES.ADMIN]),
    academicLoadController.createAcademicLoadHandler
);

router.get(
    '/',
    validateToken,
    checkRole([ROLES.ADMIN]),
    academicLoadController.listAcademicLoadsHandler
);

router.get(
    '/:carga_academica_id/students',
    validateToken,
    checkRole([ROLES.DOCENTE]),
    academicLoadController.listStudentsByAcademicLoadHandler
);

router.get(
    '/my-loads',
    validateToken,
    checkRole([ROLES.DOCENTE]),
    academicLoadController.listMyAcademicLoadsHandler
);

router.patch(
    '/:id',
    validateToken,
    checkRole([ROLES.ADMIN]),
    academicLoadController.updateAcademicLoadHandler
);

export default router;