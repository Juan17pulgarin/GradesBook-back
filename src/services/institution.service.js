import * as institucionRepository from '../repositories/institution.repository.js';
import * as userRepository from '../repositories/user.repository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ROLES } from '../utils/constants.js';

export const createInstitucion = async (institucionData, administradorData) => {
  const existing = await institucionRepository.findByNit(institucionData.nit);
  if (existing) throw new Error('NIT_EXISTS');

  const existingUser = await userRepository.findUserByDocumentoGlobal(administradorData.documento);
  if (existingUser) throw new Error('DOCUMENT_EXISTS');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(administradorData.password, salt);

  const adminData = {
    ...administradorData,
    password: hashedPassword,
    tipo: ROLES.ADMIN
  };

  const { admin, institucion } = await institucionRepository.createInstitucion(adminData, institucionData);

  const token = jwt.sign(
    {
      id: admin.id,
      role: admin.tipo,
      institucion_id: admin.institucion_id
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return { institucion, administrador: admin, token };
};
