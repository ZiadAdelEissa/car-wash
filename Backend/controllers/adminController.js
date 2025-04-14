import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Branch from '../models/Branch.js';
export const getAllBookings = async (req, res) => {
  try {
    const { branchId, status } = req.query;
    let filter = {};
    
    if (branchId) filter.branchId = branchId;
    if (status) filter.status = status;

    const bookings = await Booking.find(filter)
      .populate('userId')
      .populate('branchId')
      .populate('serviceId')
      .populate('userPackageId');
      
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status, adminNotes } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    if (adminNotes) booking.adminNotes = adminNotes;
    await booking.save();

    res.json({ message: 'Booking status updated', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
};

export const getSystemStats = async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const completedBookings = await Booking.countDocuments({ status: 'completed' });
    const activeUsers = await User.countDocuments();
    
    res.json({
      totalBookings,
      completedBookings,
      activeUsers
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats', error: error.message });
  }
};
export const createBranch = async (req, res) => {
    try {
      const { name, location, openingHours } = req.body;
      const branch = new Branch({ name, location, openingHours });
      await branch.save();
      res.status(201).json({ message: 'Branch created successfully', branch });
    } catch (error) {
      res.status(500).json({ message: 'Error creating branch', error: error.message });
    }
  };
  
  export const getAllBranches = async (req, res) => {
    try {
      const branches = await Branch.find({ isActive: true });
      res.json(branches);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching branches', error: error.message });
    }
  };
  
  export const updateBranch = async (req, res) => {
    try {
      const { branchId } = req.params;
      const updates = req.body;
      const branch = await Branch.findByIdAndUpdate(branchId, updates, { new: true });
      if (!branch) return res.status(404).json({ message: 'Branch not found' });
      res.json({ message: 'Branch updated successfully', branch });
    } catch (error) {
      res.status(500).json({ message: 'Error updating branch', error: error.message });
    }
  };
  export const getBranchBookings = async (req, res) => {
    try {
      const branchId = req.session.user.branch;
      const { status } = req.query;
      
      const filter = { branchId };
      if (status) filter.status = status;
  
      const bookings = await Booking.find(filter)
        .populate('userId', 'name email phone')
        .populate('branchId', 'name location')
        .populate('serviceId', 'name price')
        .populate('userPackageId', 'remainingWashes');
  
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ 
        message: 'Failed to fetch branch bookings',
        error: error.message 
      });
    }
  };
  // Update booking status (only for admin's branch)
  export const updateBranchBookingStatus = async (req, res) => {
    try {
      const admin = req.session.user;
      const { bookingId } = req.params;
      const { status, adminNotes } = req.body;
  
      if (admin.role !== 'branch-admin') {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      const booking = await Booking.findOne({
        _id: bookingId,
        branchId: admin.branch
      });
  
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found in your branch' });
      }
  
      booking.status = status;
      if (adminNotes) booking.adminNotes = adminNotes;
      await booking.save();
  
      res.json({ message: 'Booking status updated', booking });
    } catch (error) {
      res.status(500).json({ message: 'Error updating booking', error: error.message });
    }
  };
  
  export const updateBranchBooking = async (req, res) => {
    try {
      const { bookingId } = req.params;
      const branchId = req.session.user.branch;
  
      const booking = await Booking.findOneAndUpdate(
        { _id: bookingId, branchId },
        req.body,
        { new: true }
      ).populate('userId', 'name email');
  
      if (!booking) {
        return res.status(404).json({ 
          message: 'Booking not found in your branch' 
        });
      }
  
      res.json({ 
        message: 'Booking updated successfully',
        booking 
      });
    } catch (error) {
      res.status(500).json({ 
        message: 'Failed to update booking',
        error: error.message 
      });
    }
  };
  // Get branch stats (only for the admin's branch)
  export const getBranchStats = async (req, res) => {
    try {
      const admin = req.session.user;
      
      if (admin.role !== 'branch-admin') {
        return res.status(403).json({ message: 'Access denied' });
      }
  
      const totalBookings = await Booking.countDocuments({ branchId: admin.branch });
      const completedBookings = await Booking.countDocuments({ 
        branchId: admin.branch,
        status: 'completed' 
      });
      
      res.json({
        totalBookings,
        completedBookings,
        branch: admin.branch
      });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching stats', error: error.message });
    }
  };