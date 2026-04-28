import * as userRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';

export const registerUser = async (userData) => {
  const existingUser = await userRepository.findUserByDocumento(userData.documento);
  if (existingUser) {
    throw new Error('DOCUMENT_EXISTS');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  return await userRepository.createUser({
    ...userData,
    password: hashedPassword
  });
};