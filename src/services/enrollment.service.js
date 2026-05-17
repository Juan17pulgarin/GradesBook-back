import * as enrollmentRepository from '../repositories/enrollment.repository.js';

export const createEnrollment = async (data) => {
    const student = await enrollmentRepository.findStudentById(data.estudiante_id);

    if (!student) {
        throw new Error('STUDENT_NOT_FOUND');
    }

    const course = await enrollmentRepository.findCourseById(data.curso_id);

    if (!course) {
        throw new Error('COURSE_NOT_FOUND');
    }

    const existingEnrollment = await enrollmentRepository.findEnrollment(
        data.estudiante_id,
        data.curso_id
        );

    if (existingEnrollment) {
        throw new Error('ENROLLMENT_ALREADY_EXISTS');
    }

    return await enrollmentRepository.createEnrollment(data);
};

export const listEnrollments = async () => {
    return await enrollmentRepository.listEnrollments();
};