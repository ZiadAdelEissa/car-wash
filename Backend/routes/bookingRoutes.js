import express from 'express';
import { 
  createBooking, 
  completeBooking, 
  getCustomerBookings 
} from '../controllers/bookingController.js';
import { isAuthenticated } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', isAuthenticated, createBooking);
router.patch('/:id/complete', isAuthenticated, completeBooking);
router.get('/my-bookings', isAuthenticated, getCustomerBookings);

export default router;