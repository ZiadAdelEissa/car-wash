import express from 'express';
import { 
  getBranchBookings,
  updateBranchBooking
} from '../controllers/adminController.js';
import { isBranchAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(isBranchAdmin);

router.get('/branches/:id/bookings', getBranchBookings);
router.patch('/branches/:id/bookings/:bookingId', updateBranchBooking);

export default router;