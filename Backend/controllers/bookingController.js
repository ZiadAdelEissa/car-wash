import Booking from '../models/Booking.js';
import UserPackage from '../models/UserPackage.js';
import User from '../models/User.js';

export const createBooking = async (req, res) => {
  try {
    const { branchId, serviceId, userPackageId, bookingDate, bookingTime } = req.body;
    const userId = req.session.user._id;

    const booking = new Booking({
      userId,
      branchId,
      serviceId,
      userPackageId,
      bookingDate,
      bookingTime
    });

    await booking.save();
    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Booking creation failed', error: error.message });
  }
};

export const completeBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId).populate('userPackageId');

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
        
        // Notify user (in a real app, you'd send email/SMS here)
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