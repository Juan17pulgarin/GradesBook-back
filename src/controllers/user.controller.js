import * as userService from '../services/user.service.js';

export const createUserHandler = async (req, res) => {
  try {
    const { tipo } = req.body;

    if (tipo === 'ADMINISTRADOR') {
      return res.status(403).json({ 
        message: 'No tienes permisos para crear usuarios con rol ADMINISTRADOR' 
      });
    }

    const rolesPermitidos = ['DOCENTE', 'ESTUDIANTE'];
    if (!rolesPermitidos.includes(tipo)) {
      return res.status(400).json({ 
        message: 'Tipo de usuario no válido. Debe ser DOCENTE o ESTUDIANTE' 
      });
    }

    const user = await userService.registerUser(req.body);
    
    res.status(201).json({
      message: `${tipo.toLowerCase()} creado exitosamente`,
      user
    });
  } catch (error) {
    if (error.message === 'EMAIL_EXISTS') {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }
    res.status(500).json({ message: 'Error al crear el usuario', error: error.message });
  }
};