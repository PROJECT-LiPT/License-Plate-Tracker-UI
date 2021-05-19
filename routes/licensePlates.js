import express from 'express';

import { getLicensePlates, createLicensePlate, deleteLicensePlate, updateLicensePlate } from '../controllers/licensePlates.js';

const router = express.Router();

router.get('/', getLicensePlates);
router.post('/', createLicensePlate);
router.post('/updateLicensePlate/:id', updateLicensePlate);
router.delete('/:id', deleteLicensePlate);

export default router;