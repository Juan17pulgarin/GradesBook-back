import * as periodService from '../services/period.service.js';

export const createPeriodHandler = async (req, res) => {
    try {
        const period = await periodService.createPeriod(req.body);

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

        res.status(500).json({
            message: 'Error al crear periodo',
            error: error.message
        });
    }
};

export const listPeriodsHandler = async (req, res) => {
    try {

        const periods = await periodService.listPeriods();
        res.json(periods);

    } catch (error) {

        res.status(500).json({
            message: 'Error al listar periodos',
            error: error.message
        });
    }
};