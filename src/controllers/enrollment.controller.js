import * as enrollmentService from '../services/enrollment.service.js';

export const createEnrollmentHandler = async (req, res) => {
    try {

        const enrollment =
        await enrollmentService.createEnrollment(
            req.body
        );

        res.status(201).json({
        message: 'Matrícula creada exitosamente',
        enrollment
        });

    } catch (error) {

        if (error.message === 'STUDENT_NOT_FOUND') {
        return res.status(404).json({
            message: 'El estudiante no existe'
        });
        }

        if (error.message === 'COURSE_NOT_FOUND') {
        return res.status(404).json({
            message: 'El curso no existe'
        });
        }

        if (error.message === 'ENROLLMENT_ALREADY_EXISTS') {
        return res.status(400).json({
            message: 'El estudiante ya está matriculado'
        });
        }

        res.status(500).json({
        message: 'Error al crear matrícula',
        error: error.message
        });
    }
};

export const listEnrollmentsHandler = async ( req, res) => {
    try {

        const enrollments = await enrollmentService.listEnrollments();

        res.json(enrollments);

    } catch (error) {
        res.status(500).json({
        message: 'Error al listar matrículas',
        error: error.message
        });
    }
};