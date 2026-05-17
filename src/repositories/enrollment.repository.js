import prisma from '../config/prisma.js';

export const createEnrollment = async (data) => {
    return await prisma.matriculas.create({
        data: {
            estudiante_id: parseInt(data.estudiante_id),
            curso_id: parseInt(data.curso_id)
        }
    });
};

export const findStudentById = async (id) => {
    return await prisma.usuarios.findFirst({
        where: {
            id: parseInt(id),
            tipo: 'ESTUDIANTE',
            activo: true
        }
    });
};

export const findCourseById = async (id) => {
    return await prisma.cursos.findUnique({
        where: {
            id: parseInt(id)
        }
    });
};

export const findEnrollment = async (estudiante_id, curso_id) => {
    return await prisma.matriculas.findFirst({
        where: {
            estudiante_id: parseInt(estudiante_id),
            curso_id: parseInt(curso_id)
        }
    });
};

export const listEnrollments = async () => {
    return await prisma.matriculas.findMany({
        include: {
            usuarios: {
                select: {
                nombres: true,
                apellidos: true,
                email: true
                }
            },
            cursos: true
        }
    });
};