import * as gradeService from '../services/grade.service.js';

export const createGradeHandler = async ( req, res) => {
    try {

        const grade = await gradeService.createGrade(req.body, req.user.id);

        res.status(201).json({
            message: 'Nota registrada exitosamente',
            grade
        });

    } catch (error) {

        if (error.message === 'ACTIVITY_NOT_FOUND') {
            return res.status(404).json({
                message: 'Actividad no encontrada'
            });
        }

        if (error.message === 'UNAUTHORIZED_ACTIVITY') {
            return res.status(403).json({
                message: 'No puedes usar esta actividad'
            });
        }

        if (error.message === 'STUDENT_NOT_ENROLLED') {
            return res.status(400).json({
                message: 'El estudiante no pertenece al curso'
            });
        }

        if (error.message === 'GRADE_ALREADY_EXISTS') {
            return res.status(400).json({
                message: 'La nota ya existe'
            });
        }

        res.status(500).json({
            message: 'Error al registrar nota',
            error: error.message
        });
    }
};


export const listGradesByActivityHandler = async (req, res) => {
    try {

        const grades = await gradeService.listGradesByActivity(
            req.params.actividad_id,
            req.user.id
        );

        res.json(grades);

    } catch (error) {

        if (error.message === 'ACTIVITY_NOT_FOUND') {
            return res.status(404).json({
                message: 'Actividad no encontrada'
            });
        }

        if (error.message === 'UNAUTHORIZED_ACTIVITY') {
            return res.status(403).json({
                message: 'No puedes consultar esta actividad'
            });
        }

        res.status(500).json({
            message: 'Error al listar notas',
            error: error.message
        });
    }
};

export const listStudentGradesHandler = async (req, res) => {
    try {

        const grades = await gradeService.listGradesByStudent(req.user.id);

        res.json(grades);

    } catch (error) {

        res.status(500).json({
            message:'Error al listar notas',
            error: error.message
        });
    }
};

export const deleteGradeHandler = async (req, res) => {
    try {

        const { id } = req.params;

        await gradeService.deleteGrade(id, req.user.id);

        res.json({
            message:'Nota eliminada exitosamente'
        });

    } catch (error) {

        if (error.message ==='GRADE_NOT_FOUND') {
            return res.status(404).json({
                message:'La nota no existe'
            });
        }

        if (error.message === 'UNAUTHORIZED_GRADE') {
            return res.status(403).json({
                message:'No puedes eliminar esta nota'
            });
        }

        res.status(500).json({
            message:'Error al eliminar la nota',
            error: error.message
        });
    }
};
