import * as academicLoadService from '../services/load.service.js';

export const createAcademicLoadHandler = async (req, res) => {
    try {

        const academicLoad =
        await academicLoadService.createAcademicLoad(req.body);

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

        if (error.message === 'ACADEMIC_LOAD_ALREADY_EXISTS') {
        return res.status(400).json({
            message: 'La carga académica ya existe'
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

        const academicLoads =
        await academicLoadService.listAcademicLoads();

        res.json(academicLoads);

    } catch (error) {

        res.status(500).json({
        message: 'Error al listar cargas académicas',
        error: error.message
        });
    }
};