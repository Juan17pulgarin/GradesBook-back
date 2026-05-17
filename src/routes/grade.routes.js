import { Router } from 'express';
import * as gradeController from '../controllers/grade.controller.js';
import { validateToken, checkRole } from '../middlewares/auth.middleware.js';
import { ROLES } from '../utils/constants.js';

const router = Router();

router.post(
    '/',
    validateToken,
    checkRole([ROLES.DOCENTE]),
    gradeController.createGradeHandler
);

router.get(
    '/activity/:actividad_id',
    validateToken,
    checkRole([ROLES.DOCENTE]),
    gradeController.listGradesByActivityHandler
);

router.get(
    '/my-grades',
    validateToken,
    checkRole([ROLES.ESTUDIANTE]),
    gradeController.listStudentGradesHandler
);

router.delete(
    '/:id',
    validateToken,
    checkRole([ROLES.DOCENTE]),
    gradeController.deleteGradeHandler
);

export default router;