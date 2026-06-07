import { Router } from 'express';
import * as subjectController from '../controllers/subject.controller.js';
import { validateToken, checkRole } from '../middlewares/auth.middleware.js';
import { ROLES } from '../utils/constants.js';

const router = Router();

router.post('/', 
  validateToken, 
  checkRole([ROLES.ADMIN]), 
  subjectController.createSubjectHandler
);

router.get('/', 
  validateToken, 
  checkRole([ROLES.ADMIN]), 
  subjectController.listSubjectsHandler
);

router.get(
  '/my-subjects',
  validateToken,
  checkRole([ROLES.ESTUDIANTE]),
  subjectController.listStudentSubjectsHandler
);

router.get(
  '/available',
  validateToken,
  checkRole([ROLES.ADMIN]),
  subjectController.listSubjectsWithoutAcademicLoadHandler
);

router.patch('/:id', 
  validateToken, 
  checkRole([ROLES.ADMIN]), 
  subjectController.deleteSubjectHandler
);

export default router;