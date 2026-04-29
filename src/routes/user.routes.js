import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { validateToken, checkRole } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', 
  validateToken, 
  checkRole(['ADMINISTRADOR']), 
  userController.createUserHandler
);

router.patch('/:id', 
  validateToken, 
  checkRole(['ADMINISTRADOR']), 
  userController.deleteUserHandler
);

router.get('/', 
  validateToken, 
  checkRole(['ADMINISTRADOR', 'DOCENTE']), 
  userController.listUsersHandler
);

export default router;