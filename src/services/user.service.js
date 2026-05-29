import * as userRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import { ROLES } from '../utils/constants.js';

export const registerUser = async (userData, institucion_id) => {
  const existingUser = await userRepository.findUserByDocumento(userData.documento, institucion_id);
  if (existingUser) {
    throw new Error('DOCUMENT_EXISTS');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  return await userRepository.createUser({
    ...userData,
    institucion_id,
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

export const listUsers = async (currentUserRole, filterTipo, institucion_id) => {
  if (currentUserRole ===  ROLES.DOCENTE) {
    return await userRepository.listUsers(ROLES.ESTUDIANTE, institucion_id);
  }

  return await userRepository.listUsers(filterTipo, institucion_id);
};

export const updateUser = async (id, updateData, institucion_id) => {
  const existingUser = await userRepository.findUserById(id, institucion_id);
  
  if (!existingUser) {
    throw new Error('USER_NOT_FOUND');
  }

  if (updateData.documento && updateData.documento !== existingUser.documento) {
    const docExists = await userRepository.findUserByDocumento(updateData.documento, institucion_id);
    if (docExists) {
      throw new Error('DOCUMENT_EXISTS');
    }
  }

  if (updateData.password) {
    delete updateData.password;
  }

  return await userRepository.updateUser(id, updateData);
};