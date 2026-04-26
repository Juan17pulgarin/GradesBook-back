import * as userRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';

export const registerTeacher = async (teacherData) => {
  const existingUser = await userRepository.findUserByEmail(teacherData.email);
  if (existingUser) {
    throw new Error('EMAIL_EXISTS');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(teacherData.password, salt);

  return await userRepository.createUser({
    ...teacherData,
    password: hashedPassword,
    tipo: 'DOCENTE'
  });
};