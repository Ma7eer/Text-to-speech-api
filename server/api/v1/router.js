import express from 'express';
import speechRoutes from './speech/routes';

const router = express.Router();

router.use('/speech', speechRoutes);

export default router;
