import express from 'express';
import indexRoutes from './index/routes';

const router = express.Router();

router.use('/', indexRoutes);

export default router;
