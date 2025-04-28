import express from 'express';
import PriceHistoryController from '../controllers/PriceHistoryController.js';

const router = express.Router();

router.get('/price-history/:roomId', PriceHistoryController.getPriceHistoryByRoomId);

export default router;
