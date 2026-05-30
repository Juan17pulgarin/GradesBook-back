import prisma from '../config/prisma.js';

export const findByNit = async (nit) => {
  return await prisma.instituciones.findUnique({
    where: { nit }
  });
};

export const createInstitucion = async (adminData, institucionData) => {
  return await prisma.$transaction(async (tx) => {
    const admin = await tx.usuarios.create({
      data: {
        nombres: adminData.nombres,
        apellidos: adminData.apellidos,
        email: adminData.email,
        password: adminData.password,
        tipo: adminData.tipo,
        documento: adminData.documento,
        telefono: adminData.telefono
      },
      select: { id: true }
    });

    const institucion = await tx.instituciones.create({
      data: {
        nombre: institucionData.nombre,
        nit: institucionData.nit,
        telefono: institucionData.telefono,
        direccion: institucionData.direccion,
        administrador_id: admin.id
      },
      select: {
        id: true,
        nombre: true,
        nit: true,
        telefono: true,
        direccion: true,
        administrador_id: true,
        fecha_creacion: true
      }
    });

    const adminActualizado = await tx.usuarios.update({
      where: { id: admin.id },
      data: { institucion_id: institucion.id },
      select: {
        id: true,
        nombres: true,
        apellidos: true,
        email: true,
        tipo: true,
        documento: true,
        telefono: true,
        institucion_id: true
      }
    });

    return { admin: adminActualizado, institucion };
  });
};
