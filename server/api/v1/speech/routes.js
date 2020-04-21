import express from 'express';

import { sendSpeech } from './controller';

const router = express.Router();

/* GET home page. */
router.post('/', sendSpeech);

export default router;
