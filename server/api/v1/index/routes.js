import express from 'express';

import { getMessage } from './controller';

const router = express.Router();

/* GET home page. */
router.get('/', getMessage);

export default router;
