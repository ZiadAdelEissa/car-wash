import Booking from '../models/Booking.js';
import UserPackage from '../models/UserPackage.js';
import User from '../models/User.js';
import Branch from '../models/Branch.js';
import Service from '../models/Service.js';

export const createBooking = async (req, res) => {
  try {
    const { branchId, serviceId, userPackageId, bookingDate, bookingTime } = req.body;
    const userId = req.session.user._id;

    // Convert booking time to moment object for comparison
    const bookingDateTime = moment(`${bookingDate} ${bookingTime}`, 'YYYY-MM-DD HH:mm');
    const oneHourAfter = moment(bookingDateTime).add(1, 'hour');

    // Check for any completed bookings in the past hour at this branch
    const recentCompletedBookings = await Booking.find({
      branchId,
      status: 'completed',
      completedAt: {
        $gte: moment().subtract(1, 'hour').toDate(),
        $lte: moment().toDate()
      }
    });

    // Check if the desired time slot falls within 1 hour after any completed booking
    const isSlotDisabled = recentCompletedBookings.some(booking => {
      const completedTime = moment(booking.completedAt);
      const disabledUntil = moment(completedTime).add(1, 'hour');
      return bookingDateTime.isBetween(completedTime, disabledUntil, null, '[)');
    });

    if (isSlotDisabled) {
      return res.status(400).json({ 
        message: 'This time slot is temporarily unavailable. Please choose a time at least 1 hour after the last completed booking.' 
      });
    }

    // Check booking limit (3 per time slot)
    const existingBookings = await Booking.countDocuments({
      branchId,
      bookingDate,
      bookingTime,
      status: { $ne: 'completed' }
    });

    if (existingBookings >= 3) {
      return res.status(400).json({ 
        message: 'This time slot is fully booked. Please choose another time.' 
      });
    }

    const booking = new Booking({
      userId,
      branchId,
      serviceId,
      userPackageId,
      bookingDate,
      bookingTime,
      status: 'pending'
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Booking creation failed', error: error.message });
  }
};

export const completeBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id).populate('userPackageId');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Update booking status
    booking.status = 'completed';
    booking.completedAt = new Date();
    await booking.save();

    // If package was used, decrement remaining washes
    if (booking.userPackageId) {
      const userPackage = await UserPackage.findById(booking.userPackageId);
      if (userPackage.remainingWashes > 0) {
        userPackage.remainingWashes -= 1;
        await userPackage.save();
        
        // Notify user
        const user = await User.findById(booking.userId);
        user.notifications.push({
          message: `Your wash is complete. Remaining washes in package: ${userPackage.remainingWashes}`,
          date: new Date()
        });
        await user.save();
      }
    }

    res.json({ message: 'Booking marked as completed', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error completing booking', error: error.message });
  }
};
export const getCustomerBookings = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const bookings = await Booking.find({ userId })
      .populate('branchId')
      .populate('serviceId')
      .populate('userPackageId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};
export const getBranches = async (req, res) => {
  try {
    const branches = await Branch.find();
    res.json(branches);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching branches', error: error.message });
  }
}
export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
}