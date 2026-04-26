import * as userRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';

export const registerUser = async (userData) => {
  const existingUser = await userRepository.findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('EMAIL_EXISTS');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  return await userRepository.createUser({
    ...userData,
    password: hashedPassword
  });
};