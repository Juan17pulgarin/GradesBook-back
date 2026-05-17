import * as activityService
from '../services/activity.service.js';

export const createActivityHandler = async (req, res) => {
    try {
        const activity =
        await activityService.createActivity(
            req.body,
            req.user.id
        );

        res.status(201).json({
        message: 'Actividad creada exitosamente',
        activity
        });

    } catch (error) {

        if (error.message === 'ACADEMIC_LOAD_NOT_FOUND') {
            return res.status(404).json({
                message: 'Carga académica no encontrada'
            });
        }

        if (error.message === 'UNAUTHORIZED_ACADEMIC_LOAD') {
            return res.status(403).json({
                message: 'No puedes usar esta carga académica'
            });
        }

        if (error.message === 'PERIOD_NOT_FOUND') {
            return res.status(404).json({
                message: 'Periodo no encontrado'
            });
        }
        
        if (error.message === 'ACTIVITY_ALREADY_EXISTS') {
            return res.status(400).json({
                message:'Ya existe una actividad con ese nombre en este periodo'
            });
        }

        if (error.message === 'PERCENTAGE_LIMIT_EXCEEDED') {
            return res.status(400).json({
                message:'La suma de porcentajes excede el 100%'
            });
        };

        res.status(500).json({
            message: 'Error al crear actividad',
            error: error.message
        });
    }
};

export const listActivitiesHandler = async (req, res) => {
    try {

        const activities = await activityService.listActivitiesByTeacher(req.user.id);
        res.json(activities);

    } catch (error) {

        res.status(500).json({
            message: 'Error al listar actividades',
            error: error.message
        });
    }
};

export const listStudentActivitiesHandler = async (req, res) => {
    try {

        const activities = await activityService.listActivitiesByStudent(req.user.id);
        res.json(activities);

    } catch (error) {

        res.status(500).json({
            message:'Error al listar actividades',
            error: error.message
        });
    }
};
