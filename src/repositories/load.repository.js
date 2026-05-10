import prisma from '../config/prisma.js';

export const createAcademicLoad = async (data) => {
    return await prisma.carga_academica.create({
        data: {
        docente_id: parseInt(data.docente_id),
        curso_id: parseInt(data.curso_id),
        materia_id: parseInt(data.materia_id)
        }
    });
};

export const findExistingAcademicLoad = async (
    docente_id,
    curso_id,
    materia_id
    ) => {
    return await prisma.carga_academica.findFirst({
        where: {
        docente_id: parseInt(docente_id),
        curso_id: parseInt(curso_id),
        materia_id: parseInt(materia_id)
        }
    });
};

export const findTeacherById = async (id) => {
    return await prisma.usuarios.findFirst({
        where: {
        id: parseInt(id),
        tipo: 'DOCENTE',
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

export const findSubjectById = async (id) => {
    return await prisma.materias.findUnique({
        where: {
        id: parseInt(id)
        }
    });
};

export const listAcademicLoads = async () => {
    return await prisma.carga_academica.findMany({
        include: {
        usuarios: {
            select: {
            nombres: true,
            apellidos: true,
            email: true
            }
        },
        cursos: true,
        materias: true
        }
    });
};

// Validar que no exista una carga académica con el mismo curso y materia para otro docente
export const findAcademicLoadById = async (id) => {
    return await prisma.carga_academica.findUnique({
        where: {
        id: parseInt(id)
        }
    });
};

export const findByCourseAndSubject = async (
    curso_id,
    materia_id
) => {

    return await prisma.carga_academica.findFirst({
        where: {
        curso_id: parseInt(curso_id),
        materia_id: parseInt(materia_id)
        }
    });

};

// Actualizar una carga académica
export const updateAcademicLoad = async (id, data) => {

    return await prisma.carga_academica.update({
        where: {
        id: parseInt(id)
        },
        data: {
        docente_id: parseInt(data.docente_id),
        curso_id: parseInt(data.curso_id),
        materia_id: parseInt(data.materia_id)
        }
    });

};