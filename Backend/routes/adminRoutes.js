import express from 'express';
import { 
  getAllBookings, 
  updateBookingStatus,
  getSystemStats,
  createBranch,
  getAllBranches,
  updateBranch,
  getBranchStats
} from '../controllers/adminController.js';
// import { isSuperAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Booking management
router.get('/bookings', getAllBookings);
router.patch('/bookings/:id', updateBookingStatus);

// Branch management
router.get('/branches', getAllBranches);
router.post('/branches', createBranch);
router.put('/branches/:id', updateBranch);

// Stats
router.get('/stats', getSystemStats);
router.get('/branches/:id/stats', getBranchStats);

export default router;