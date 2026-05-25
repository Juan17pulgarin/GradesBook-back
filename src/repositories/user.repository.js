import prisma from '../config/prisma.js';

export const findUserByDocumento = async (documento) => {
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
      telefono: userData.telefono
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

export const listUsers = async (tipo = null) => {
  return await prisma.usuarios.findMany({
    where: {
      activo: true,
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

export const findUserById = async (id) => {
  return await prisma.usuarios.findUnique({
    where: { id: parseInt(id) }
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