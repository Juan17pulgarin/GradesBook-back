import * as userService from '../services/user.service.js';

export const createTeacherHandler = async (req, res) => {
  try {
    const teacher = await userService.registerTeacher(req.body);
    res.status(201).json({
      message: 'Docente creado exitosamente',
      user: teacher
    });
  } catch (error) {
    if (error.message === 'EMAIL_EXISTS') {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }
    res.status(500).json({ message: 'Error al crear el docente', error: error.message });
  }
};