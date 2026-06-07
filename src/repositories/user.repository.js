import prisma from '../config/prisma.js';

export const findUserByDocumento = async (documento, institucion_id) => {
  return await prisma.usuarios.findFirst({
    where: {
      documento: documento,
      institucion_id: parseInt(institucion_id),
      activo: true
    }
  });
};

export const findUserByDocumentoGlobal = async (documento) => {
  return await prisma.usuarios.findFirst({
    where: { documento }
  });
};

export const findUserForLogin = async (documento) => {
  return await prisma.usuarios.findFirst({
    where: {
      documento: documento,
      activo: true
    }
  });
};

export const createUser = async (userData) => {
  return await prisma.usuarios.create({
    data: {
      nombres: userData.nombres,
      apellidos: userData.apellidos,
      email: userData.email,
      password: userData.password,
      tipo: userData.tipo,
      documento: userData.documento,
      telefono: userData.telefono,
      institucion_id: parseInt(userData.institucion_id) 
    },
    select: {
      id: true,
      email: true,
      nombres: true,
      apellidos: true,
      tipo: true
    }
  });
};

export const deleteUser = async (id, status) => {
  return await prisma.usuarios.update({
    where: { id: parseInt(id) },
    data: { activo: status },
    select: {
      id: true,
      nombres: true,
      activo: true
    }
  });
};

export const listInactiveUsers = async (institucion_id) => {
  return await prisma.usuarios.findMany({
    where: {
      activo: false,
      institucion_id: parseInt(institucion_id)
    },
    select: {
      id: true,
      documento: true,
      nombres: true,
      apellidos: true,
      email: true,
      tipo: true
    },
    orderBy: {
      apellidos: 'asc'
    }
  });
};

export const listUsers = async (tipo = null, institucion_id) => {
  return await prisma.usuarios.findMany({
    where: {
      activo: true,
      institucion_id: parseInt(institucion_id), 
      ...(tipo && { tipo: tipo })
    },
    select: {
      id: true,
      documento: true,
      nombres: true,
      apellidos: true,
      email: true,
      tipo: true
    },
    orderBy: {
      apellidos: 'asc'
    }
  });
};

export const findUserById = async (id, institucion_id) => {
  return await prisma.usuarios.findFirst({ 
    where: { 
      id: parseInt(id),
      institucion_id: parseInt(institucion_id) 
    },
    select: {
      id: true,
      nombres: true,
      apellidos: true,
      email: true,
      tipo: true,
      documento: true,
      telefono: true,
      direccion: true,
      carnet: true
    }
  });
};

export const updateUser = async (id, data) => {
  return await prisma.usuarios.update({
    where: { id: parseInt(id) },
    data: data,
    select: {
      id: true,
      nombres: true,
      apellidos: true,
      email: true,
      tipo: true,
      documento: true,
      telefono: true,
      direccion: true,
      carnet: true
    }
  });
};