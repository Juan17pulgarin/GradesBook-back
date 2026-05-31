import * as periodService from '../services/period.service.js';

export const createPeriodHandler = async (req, res) => {
    try {
        const period = await periodService.createPeriod({ 
            ...req.body, 
            institucion_id: req.user.institucion_id
        });

        res.status(201).json({
            message: 'Periodo creado exitosamente',
            period
        });

    } catch (error) {

        if (error.message === 'PERIOD_ALREADY_EXISTS') {
            return res.status(400).json({
                message: 'El periodo ya existe'
            });
        }

        if (error.message === 'INVALID_DATES') {
            return res.status(400).json({
                message: 'Las fechas son inválidas'
            });
        }

        if (error.message === 'MAX_PERIODS_EXCEEDED') {
            return res.status(400).json({
                message:'Solo se permiten 4 periodos por año'
            });
        }

        if (error.message === 'PERIOD_TOO_SHORT') {
            return res.status(400).json({
                message:'El periodo debe durar mínimo 2 meses'
            });
        }

        if (error.message === 'PERIOD_TOO_LONG') {
            return res.status(400).json({
                message:'El periodo debe durar máximo 2.5 meses'
            });
        }

        if (error.message === 'PERIOD_OVERLAPPING') {
            return res.status(400).json({
                message: 'El periodo se solapa con uno ya existente'
            });
        }

        res.status(500).json({
            message: 'Error al crear periodo',
            error: error.message
        });
    }
};

export const listPeriodsHandler = async (req, res) => {
    try {
        const periods = await periodService.listPeriods(req.user.institucion_id);
        res.json(periods);

    } catch (error) {

        res.status(500).json({
            message: 'Error al listar periodos',
            error: error.message
        });
    }
};

export const updatePeriodHandler = async (req, res) => {
    try {
        const period = await periodService.updatePeriod(
            req.params.id,
            req.body,
            req.user.institucion_id
        );

        res.json({
            message: 'Periodo actualizado exitosamente',
            period
        });

    } catch (error) {

        if (error.message === 'PERIOD_NOT_FOUND') {
            return res.status(404).json({ message: 'El periodo no existe' });
        }

        if (error.message === 'UNAUTHORIZED_PERIOD') {
            return res.status(403).json({ message: 'No puedes modificar este periodo' });
        }

        if (error.message === 'INVALID_DATES') {
            return res.status(400).json({ message: 'Las fechas son inválidas' });
        }

        if (error.message === 'PERIOD_OVERLAPPING') {
            return res.status(400).json({ message: 'El periodo se solapa con uno ya existente' });
        }

        if (error.message === 'PERIOD_TOO_SHORT') {
            return res.status(400).json({ message: 'El periodo debe durar mínimo 2 meses' });
        }

        if (error.message === 'PERIOD_TOO_LONG') {
            return res.status(400).json({ message: 'El periodo debe durar máximo 2.5 meses' });
        }

        res.status(500).json({ message: 'Error al actualizar periodo', error: error.message });
    }
};
