import * as gradeRepository
from '../repositories/grade.repository.js';

export const createGrade = async (gradeData, docente_id) => {
    const { institucion_id } = gradeData;

    const activity = await gradeRepository.findActivityById(gradeData.actividad_id, institucion_id);
    if (!activity) throw new Error('ACTIVITY_NOT_FOUND');

    if (activity.carga_academica.docente_id !== docente_id) {
        throw new Error('UNAUTHORIZED_ACTIVITY');
    }

    const enrollment = await gradeRepository.findEnrollment(
        gradeData.estudiante_id,
        activity.carga_academica.curso_id
    );
    if (!enrollment) throw new Error('STUDENT_NOT_ENROLLED');

    const existingGrade = await gradeRepository.findExistingGrade(
        gradeData.estudiante_id,
        gradeData.actividad_id
    );
    if (existingGrade) throw new Error('GRADE_ALREADY_EXISTS');

    return await gradeRepository.createGrade(gradeData);
};

export const listGradesByActivity = async (actividad_id, docente_id) => {
    
    const activity = await gradeRepository.findActivityById(actividad_id);

    if (!activity) {
        throw new Error('ACTIVITY_NOT_FOUND');
    }

    if (activity.carga_academica.docente_id !== docente_id) {
        throw new Error('UNAUTHORIZED_ACTIVITY');
    }

    return await gradeRepository.listGradesByActivity(actividad_id);
};

export const listGradesByStudent = async (estudiante_id) => {
    
    return await gradeRepository.listGradesByStudent(estudiante_id);
};

export const getSchoolAverage = async (institucion_id) => {
    const students = await gradeRepository.getStudentsBySchool(institucion_id);

    if (students.length === 0) {
        return { promedio_general: 0, estado: 'SIN_NOTAS' };
    }

    const averages = await Promise.all(
        students.map(student => getGeneralAverage(student.id))
    );

    // Filtra estudiantes sin notas
    const withGrades = averages.filter(a => a.estado !== 'SIN_NOTAS');

    if (withGrades.length === 0) {
        return { promedio_general: 0, estado: 'SIN_NOTAS' };
    }

    const total = withGrades.reduce((sum, a) => sum + a.promedio_general, 0);
    const promedioGeneral = total / withGrades.length;

    return {
        promedio_general: Number(promedioGeneral.toFixed(2))
    };
};

export const calculateStudentAverage = async (estudiante_id, carga_academica_id, periodo_id, docente_id) => {

    const academicLoad = await gradeRepository.findAcademicLoadById(carga_academica_id);
    const enrollment = await gradeRepository.findEnrollment(estudiante_id, academicLoad.curso_id);


    if (!academicLoad) {
        throw new Error('ACADEMIC_LOAD_NOT_FOUND');
    }

    if (academicLoad.docente_id !== parseInt(docente_id)) {
        throw new Error('UNAUTHORIZED_ACADEMIC_LOAD');
    }

    if (!enrollment) {
        throw new Error('STUDENT_NOT_ENROLLED');
    }

    const grades = await gradeRepository.getStudentAverage(
            estudiante_id,
            carga_academica_id,
            periodo_id
        );

    if (grades.length === 0) {
        throw new Error('NO_GRADES_FOUND');
    }

    let average = 0;

    grades.forEach(grade => {
        average += parseFloat(grade.nota) * (parseFloat(grade.actividades.porcentaje) / 100);
    });

    return { promedio: Number(average.toFixed(2))};

};

export const getGeneralAverageByPeriod = async (estudiante_id, periodo_id) => {
    const grades = await gradeRepository.getStudentGradesForAverageByPeriod(estudiante_id, periodo_id);

    if (grades.length === 0) {
        return { promedio_general: 0, estado: 'SIN_NOTAS' };
    }

    const averages = {};

    grades.forEach(grade => {
        const materia = grade.actividades.carga_academica.materias.nombre;
        const key = materia;

        if (!averages[key]) {
            averages[key] = { materia, promedio: 0 };
        }

        averages[key].promedio += parseFloat(grade.nota) * (parseFloat(grade.actividades.porcentaje) / 100);
    });

    const subjectAverages = Object.values(averages).map(item => ({
        ...item,
        promedio: Number(item.promedio.toFixed(2)),
        estado: item.promedio >= 3 ? 'APROBANDO' : 'REPROBANDO'
    }));

    const total = subjectAverages.reduce((sum, item) => sum + item.promedio, 0);
    const promedioGeneral = total / subjectAverages.length;

    return {
        promedio_general: Number(promedioGeneral.toFixed(2)),
        estado: promedioGeneral >= 3 ? 'APROBANDO' : 'REPROBANDO',
        materias: subjectAverages
    };
};

export const getGeneralAverage = async (estudiante_id) => {
    const grades = await gradeRepository.getStudentGradesForGeneralAverage(estudiante_id);

    if (grades.length === 0) {
        return { promedio_general: 0, estado: 'SIN_NOTAS' };
    }

    const averages = {};

    grades.forEach(grade => {
        const materia = grade.actividades.carga_academica.materias.nombre;
        const periodo = grade.actividades.periodos.nombre;
        const key = `${materia}-${periodo}`;

        if (!averages[key]) {
            averages[key] = { materia, periodo, promedio: 0 };
        }

        averages[key].promedio += parseFloat(grade.nota) * (parseFloat(grade.actividades.porcentaje) / 100);
    });

    const subjectAverages = Object.values(averages).map(item => ({
        ...item,
        promedio: Number(item.promedio.toFixed(2)),
        estado: item.promedio >= 3 ? 'APROBANDO' : 'REPROBANDO'
    }));

    const total = subjectAverages.reduce((sum, item) => sum + item.promedio, 0);
    const promedioGeneral = total / subjectAverages.length;

    return {
        promedio_general: Number(promedioGeneral.toFixed(2)),
        estado: promedioGeneral >= 3 ? 'APROBANDO' : 'REPROBANDO',
        materias: subjectAverages
    };
};

export const updateGrade = async (id, gradeData, docente_id) => {
    const grade = await gradeRepository.findGradeById(id);

    if (!grade) {
        throw new Error('GRADE_NOT_FOUND');
    }

    if (grade.actividades.carga_academica.docente_id !== parseInt(docente_id)) {
        throw new Error('UNAUTHORIZED_GRADE');
    }

    return await gradeRepository.updateGrade(id, gradeData);
};

export const deleteGrade = async (id, docente_id) => {
    const grade = await gradeRepository.findGradeById(id);

    if (!grade) {
        throw new Error('GRADE_NOT_FOUND');
    }

    if (grade.actividades.carga_academica.docente_id !== parseInt(docente_id)) {

        throw new Error('UNAUTHORIZED_GRADE');
    }

    return await gradeRepository.deleteGrade(id);
};