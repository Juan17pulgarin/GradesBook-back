import * as userService from '../services/user.service.js';
import { ROLES } from '../utils/constants.js';

export const createUserHandler = async (req, res) => {
  try {
    const { tipo } = req.body;

    if (tipo === ROLES.ADMIN) {
      return res.status(403).json({ 
        message: 'No tienes permisos para crear usuarios con rol ADMINISTRADOR' 
      });
    }

    if (![ROLES.DOCENTE, ROLES.ESTUDIANTE].includes(tipo)) {
      return res.status(400).json({ 
        message: 'Tipo de usuario no válido' 
      });
    }

    const user = await userService.registerUser(req.body);
    
    res.status(201).json({
      message: `${tipo.toLowerCase()} creado exitosamente`,
      user
    });
  } catch (error) {
    if (error.message === 'DOCUMENT_EXISTS') {
      return res.status(400).json({ message: 'El número de documento ya está registrado' });
    }
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
};

export const deleteUserHandler = async (req, res) => {
  try {
    const { id } = req.params; 
    const adminId = req.user.id;

    const result = await userService.deleteUser(id, adminId);
    
    res.json({
      message: 'Usuario desactivado correctamente',
      user: result
    });
  } catch (error) {
    if (error.message === 'SELF_DEACTIVATION_FORBIDDEN') {
      return res.status(403).json({ message: 'No puedes desactivar tu propia cuenta' });
    }
    if (error.message === 'USER_NOT_FOUND') {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(500).json({ message: 'Error interno', error: error.message });
  }
};

export const listUsersHandler = async (req, res) => {
  try {
    const { tipo } = req.query;
    const currentUserRole = req.user.role;

    const users = await userService.listUsers(currentUserRole, tipo);
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar los usuarios', error: error.message });
  }
};