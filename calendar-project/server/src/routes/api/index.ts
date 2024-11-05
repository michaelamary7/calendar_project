import { Router } from 'express';
import { eventRoutes } from './eventRoutes.js';

const router = Router();

router.use('/event', eventRoutes);

export default router;