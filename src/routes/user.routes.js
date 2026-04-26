import { Router } from 'express';
import { createTeacherHandler } from '../controllers/user.controller.js';
import { validateToken, checkRole } from '../middlewares/auth.middleware.js';

const router = Router();

router.post(
  '/teachers', 
  validateToken, 
  checkRole(['ADMINISTRADOR']), 
  createTeacherHandler
);

export default router;