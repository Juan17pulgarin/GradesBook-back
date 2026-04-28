import * as authService from '../services/auth.service.js';

export const loginHandler = async (req, res) => {
  try {
    const { documento, password } = req.body;
    const result = await authService.login(documento, password);
    res.json(result);
  } catch (error) {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
};