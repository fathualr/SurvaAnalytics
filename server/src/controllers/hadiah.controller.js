import * as hadiahService from '../services/hadiah.service.js';

export const getHadiahs = async (req, res) => {
    try {
        const hadiahs = await hadiahService.index();
        res.json({
            status: 'success',
            message: hadiahs.length > 0
            ? 'Hadiahs retrieved successfully'
            : 'No hadiahs found',
        results: hadiahs.length,
        data: hadiahs
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch hadiahs'
        });
    }
};

export const createHadiah = async (req, res) => {
    try {
        const newHadiah = await hadiahService.create(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Hadiah created successfully',
            data: newHadiah
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const getHadiah = async (req, res) => {
    try {
        const hadiah = await hadiahService.show(req.params.id);
        res.json({
            status: 'success',
            message: `Hadiah details for ID ${req.params.id} retrieved successfully`,
            data: hadiah
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const updateHadiah = async (req, res) => {
    try {
        const updatedHadiah = await hadiahService.update(req.params.id, req.body);
        res.json({
            status: 'success',
            message: `Hadiah with ID ${req.params.id} updated successfully`,
            data: updatedHadiah
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const deleteHadiah = async (req, res) => {
    try {
        await hadiahService.destroy(req.params.id);
        res.json({
            status: 'success',
            message: `Hadiah with ID ${req.params.id} deleted successfully`,
            data: null
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};