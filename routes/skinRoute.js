import express from 'express';

import { setOrUpdateSkinAnalysis,getSkinAnalysis } from '../controllers/SkinController.js';

const router = express.Router();

router.post('/skin-analysis', setOrUpdateSkinAnalysis); // uid comes from req.body
router.get('/skin-analysis/:uid', getSkinAnalysis);     // uid comes from params

export default router;
