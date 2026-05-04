import { Router } from 'express';
import * as courseController from '../controllers/course.controller.js';
import { validateToken, checkRole } from '../middlewares/auth.middleware.js';
import { ROLES } from '../utils/constants.js';

const router = Router();

router.post('/', 
  validateToken, 
  checkRole([ROLES.ADMIN]), 
  courseController.createCourseHandler
);

router.get('/', 
  validateToken, 
  checkRole([ROLES.ADMIN, ROLES.DOCENTE]), 
  courseController.listCoursesHandler
);

export default router;