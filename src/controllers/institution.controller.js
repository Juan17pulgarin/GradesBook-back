import * as institucionService from '../services/institution.service.js';

export const createInstitucionHandler = async (req, res) => {
  try {
    const { institucion, administrador } = req.body;

    if (!institucion || !administrador) {
      return res.status(400).json({
        message: 'Se requieren los datos de la institución y del administrador'
      });
    }

    const result = await institucionService.createInstitucion(institucion, administrador);

    res.status(201).json({
      message: 'Institución creada exitosamente',
      ...result
    });
  } catch (error) {
    if (error.message === 'NIT_EXISTS') {
      return res.status(400).json({ message: 'El NIT ya está registrado' });
    }
    if (error.message === 'DOCUMENT_EXISTS') {
      return res.status(400).json({ message: 'El número de documento ya está registrado' });
    }
    res.status(500).json({ message: 'Error al crear la institución', error: error.message });
  }
};
