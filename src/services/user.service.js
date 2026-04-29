import * as userRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import { ROLES } from '../utils/constants.js';

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

export const deleteUser = async (targetId, adminId) => {
  if (parseInt(targetId) === parseInt(adminId)) {
    throw new Error('SELF_DEACTIVATION_FORBIDDEN');
  }

  const updatedUser = await userRepository.deleteUser(targetId, false);
  
  if (!updatedUser) {
    throw new Error('USER_NOT_FOUND');
  }

  return updatedUser;
};

export const listUsers = async (currentUserRole, filterTipo) => {
  if (currentUserRole ===  ROLES.DOCENTE) {
    return await userRepository.listUsers(ROLES.ESTUDIANTE);
  }

  return await userRepository.listUsers(filterTipo);
};