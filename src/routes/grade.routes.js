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

router.get(
    '/average/:estudiante_id/:carga_academica_id/:periodo_id',
    validateToken,
    checkRole([ROLES.DOCENTE]),
    gradeController.calculateStudentAverageHandler
);

router.get(
    '/my-average/period/:periodo_id',
    validateToken,
    checkRole([ROLES.ESTUDIANTE]),
    gradeController.myGeneralAverageByPeriodHandler
);

router.get(
    '/my-average',
    validateToken,
    checkRole([ROLES.ESTUDIANTE]),
    gradeController.myGeneralAverageHandler
);

router.patch(
    '/:id',
    validateToken,
    checkRole([ROLES.DOCENTE]),
    gradeController.updateGradeHandler
);

router.delete(
    '/:id',
    validateToken,
    checkRole([ROLES.DOCENTE]),
    gradeController.deleteGradeHandler
);

export default router;