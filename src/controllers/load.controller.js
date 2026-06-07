import * as academicLoadService from '../services/load.service.js';

export const createAcademicLoadHandler = async (req, res) => {
    try {
        const academicLoad = await academicLoadService.createAcademicLoad({ 
            ...req.body, 
            institucion_id: req.user.institucion_id
        });

        res.status(201).json({
        message: 'Carga académica creada exitosamente',
        academicLoad
        });
    } catch (error) {

        if (error.message === 'TEACHER_NOT_FOUND') {
            return res.status(404).json({
                message: 'El docente no existe'
            });
        }

        if (error.message === 'COURSE_NOT_FOUND') {
            return res.status(404).json({
                message: 'El curso no existe'
            });
        }

        if (error.message === 'SUBJECT_NOT_FOUND') {
            return res.status(404).json({
                message: 'La materia no existe'
            });
        }
        
        if (error.message === 'SUBJECT_ALREADY_ASSIGNED') {
            return res.status(400).json({
                message:'Ya existe un docente asignado a esa materia en ese curso'
            });
        }

        res.status(500).json({
            message: 'Error al crear la carga académica',
            error: error.message
        });
    }
};

export const listAcademicLoadsHandler = async (req, res) => {
    try {

        const academicLoads = await academicLoadService.listAcademicLoads(req.user.institucion_id);
        res.json(academicLoads);

    } catch (error) {

        res.status(500).json({
            message: 'Error al listar cargas académicas',
            error: error.message
        });
    }
};

export const listStudentsByAcademicLoadHandler = async (req, res) => {

    try {

        const students = await academicLoadService.listStudentsByAcademicLoad(
                    req.params.carga_academica_id,
                    req.user.id
                );

        res.json(students);

    } catch (error) {

        if (error.message === 'ACADEMIC_LOAD_NOT_FOUND') {
            return res.status(404).json({
                message: 'La carga académica no existe'
            });
        }

        if (error.message === 'UNAUTHORIZED_ACADEMIC_LOAD') {
            return res.status(403).json({
                message:'No puedes consultar esta carga académica'
            });
        }

        res.status(500).json({
            message: 'Error al listar estudiantes',
            error: error.message
        });

    }
};

export const listMyAcademicLoadsHandler = async (req, res) => {

    try {

        const academicLoads = await academicLoadService.listAcademicLoadsByTeacher(req.user.id);
        res.json(academicLoads);

    } catch (error) {

        res.status(500).json({
            message:'Error al listar cargas académicas',
            error: error.message
        });

    }

};

export const updateAcademicLoadHandler = async (req, res) => {
    try {

        const { id } = req.params;
        const updatedAcademicLoad = await academicLoadService.updateAcademicLoad(id, { ...req.body, institucion_id: req.user.institucion_id });

        res.json({
            message:'Carga académica actualizada exitosamente',
            updatedAcademicLoad
        });

    } catch (error) {

        if (error.message === 'ACADEMIC_LOAD_NOT_FOUND') {
            return res.status(404).json({
                message:'La carga académica no existe'
            });
        }

        if (error.message === 'TEACHER_NOT_FOUND') {
            return res.status(404).json({
                message:'El docente no existe'
            });
        }

        if (error.message === 'COURSE_NOT_FOUND') {
            return res.status(404).json({
                message:'El curso no existe'
            });
        }

        if (error.message === 'SUBJECT_NOT_FOUND') {
            return res.status(404).json({
                message:'La materia no existe'
            });
        }

        if (error.message === 'SUBJECT_ALREADY_ASSIGNED') {
            return res.status(400).json({
                message:'Ya existe un docente asignado a esa materia en ese curso'
            });
        }

        res.status(500).json({
            message:'Error al actualizar la carga académica',
            error: error.message
        });
    }
};