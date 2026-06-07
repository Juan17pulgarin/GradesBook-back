import * as courseService from '../services/course.service.js';

export const createCourseHandler = async (req, res) => {
  try {
    const course = await courseService.createCourse({ 
      ...req.body, 
      institucion_id: req.user.institucion_id
    });
    
    res.status(201).json({
      message: 'Estructura académica (curso) creada exitosamente',
      course
    });
  } catch (error) {
    if (error.message === 'COURSE_ALREADY_EXISTS') {
      return res.status(400).json({ 
        message: 'Ya existe un curso con ese nombre para el año lectivo especificado' 
      });
    }
    res.status(500).json({ 
      message: 'Error al crear el curso', 
      error: error.message 
    });
  }
};

export const listCoursesHandler = async (req, res) => {
  try {
    const { anio } = req.query;
    const courses = await courseService.listCourses(anio, req.user.institucion_id);
    
    res.json(courses);
  } catch (error) {
    res.status(500).json({ 
      message: 'Error al obtener la lista de cursos', 
      error: error.message 
    });
  }
};

export const getAvailableCoursesForSubjectHandler = async (req, res) => {
  try {

    const courses = await courseService.getAvailableCoursesForSubject(
        req.params.materia_id,
        req.user.institucion_id
      );

    res.json(courses);

  } catch (error) {

    if (error.message === 'SUBJECT_NOT_FOUND') {
      return res.status(404).json({
        message: 'La materia no existe'
      });
    }

    res.status(500).json({
      message: 'Error al listar cursos disponibles',
      error: error.message
    });
  }
};

export const updateCourseHandler = async (req, res) => {
  try {

    const { id } = req.params;

    const course = await courseService.updateCourse(
        id,
        req.body,
        req.user.institucion_id
      );

    res.json({
      message: 'Curso actualizado exitosamente',
      course
    });

  } catch (error) {

    if (error.message === 'COURSE_NOT_FOUND') {
      return res.status(404).json({
        message: 'El curso no existe'
      });
    }

    if (error.message === 'COURSE_ALREADY_EXISTS') {
      return res.status(400).json({
        message:'Ya existe un curso con ese nombre para ese año'
      });
    }

    res.status(500).json({
      message: 'Error al actualizar curso',
      error: error.message
    });
  }
};