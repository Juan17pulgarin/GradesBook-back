import { Router } from 'express';
import { ROLES } from '../utils/constants.js';
import * as userController from '../controllers/user.controller.js';
import { validateToken, checkRole } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/', 
  validateToken, 
  checkRole([ROLES.ADMIN]), 
  userController.createUserHandler
);

router.patch('/:id', 
  validateToken, 
  checkRole([ROLES.ADMIN]), 
  userController.deleteUserHandler
);

router.get('/', 
  validateToken, 
  checkRole([ROLES.ADMIN, ROLES.DOCENTE]), 
  userController.listUsersHandler
);

export default router;