import * as userRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (email, password) => {
  const user = await userRepository.findUserByEmail(email);
  
  if (!user) throw new Error('UNAUTHORIZED');

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw new Error('UNAUTHORIZED');

  const token = jwt.sign(
    { id: user.id, role: user.tipo },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      tipo: user.tipo,
      nombreCompleto: `${user.nombres} ${user.apellidos}`
    }
  };
};