import User from '../models/User.js';
import Booking from '../models/Booking.js';
import UserPackage from '../models/UserPackage.js';
export const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ 
      success: false,
      message: 'Unauthorized - Please login first' 
    });
  }
  next();
};
// 1. Core Authentication Middleware
export const verifySession = (req, res, next) => {
  if (!req.session.user?._id) {
    return res.status(401).json({
      system: 'carwash-booking',
      code: 'AUTH_REQUIRED',
      message: 'No active session found',
      action: 'Please login to continue'
    });
  }
  next();
};

// 2. Role Verification Factory
const createRoleVerifier = (role) => async (req, res, next) => {
  try {
    const user = await User.findById(req.session.user._id).select('role branch');
    
    if (!user || user.role !== role) {
      return res.status(403).json({
        system: 'carwash-booking',
        code: 'ACCESS_DENIED',
        message: `Requires ${role} privileges`,
        requiredRole: role,
        currentRole: user?.role || 'none'
      });
    }

    req.authUser = user;
    next();
  } catch (error) {
    res.status(500).json({
      system: 'carwash-booking',
      code: 'ROLE_VERIFICATION_FAILED',
      message: 'Error during role verification',
      error: error.message
    });
  }
};

// 3. Role-Specific Middlewares
export const isCustomer = createRoleVerifier('customer');
export const isBranchAdmin = createRoleVerifier('branch-admin');
export const isSuperAdmin = createRoleVerifier('super-admin');

// 4. Resource Access Verification
export const verifyResourceAccess = async (req, res, next) => {
  try {
    const user = req.authUser || await User.findById(req.session.user._id).select('role branch');

    // Super admins bypass all restrictions
    if (user.role === 'super-admin') return next();

    // Branch admin access control
    if (user.role === 'branch-admin') {
      const booking = await Booking.findOne({
        _id: req.params.bookingId,
        branchId: user.branch
      });

      if (!booking) {
        return res.status(403).json({
          system: 'carwash-booking',
          code: 'BRANCH_RESOURCE_MISMATCH',
          message: 'Resource not in your branch',
          userBranch: user.branch
        });
      }
    }

    // Customer access control
    if (user.role === 'customer') {
      const resource = await Booking.findOne({
        _id: req.params.bookingId,
        userId: user._id
      }) || await UserPackage.findOne({
        _id: req.params.packageId,
        $or: [
          { userId: user._id },
          { sharedWith: user._id }
        ]
      });

      if (!resource) {
        return res.status(403).json({
          system: 'carwash-booking',
          code: 'RESOURCE_OWNERSHIP_REQUIRED',
          message: 'You don\'t own this resource'
        });
      }
    }

    next();
  } catch (error) {
    res.status(500).json({
      system: 'carwash-booking',
      code: 'ACCESS_VERIFICATION_FAILED',
      message: 'Error during resource verification',
      error: error.message
    });
  }
};

// 5. Family Sharing Verification
export const verifyFamilyAccess = async (req, res, next) => {
  try {
    const familyOwner = await User.findOne({
      _id: req.params.familyId,
      familyMembers: req.session.user._id
    }).select('_id');

    if (!familyOwner) {
      return res.status(403).json({
        system: 'carwash-booking',
        code: 'FAMILY_RELATION_MISSING',
        message: 'Not authorized as family member',
        requiredRelationship: 'family'
      });
    }

    req.familyOwnerId = familyOwner._id;
    next();
  } catch (error) {
    res.status(500).json({
      system: 'carwash-booking',
      code: 'FAMILY_VERIFICATION_FAILED',
      message: 'Error verifying family relationship',
      error: error.message
    });
  }
};

// 6. Booking State Validation
export const validateBookingState = async (req, res, next) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.bookingId,
      status: 'pending'
    }).select('branchId userId');

    if (!booking) {
      return res.status(400).json({
        system: 'carwash-booking',
        code: 'INVALID_BOOKING_STATE',
        message: 'Booking is not in a modifiable state',
        allowedStates: ['pending']
      });
    }

    req.booking = booking;
    next();
  } catch (error) {
    res.status(500).json({
      system: 'carwash-booking',
      code: 'BOOKING_VALIDATION_FAILED',
      message: 'Error validating booking state',
      error: error.message
    });
  }
};