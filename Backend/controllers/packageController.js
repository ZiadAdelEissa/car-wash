import Package from "../models/Package.js";
import UserPackage from "../models/UserPackage.js";
import User from "../models/User.js";
export const getAllPackages = async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true });
    res.json(packages);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching packages", error: error.message });
  }
};

export const purchasePackage = async (req, res) => {
  try {
    const { packageId } = req.body;
    const userId = req.session.user._id;

    const packages = await Package.findById(packageId);
    if (!packages) {
      return res.status(404).json({ message: "Package not found" });
    }

    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + packages.validityDays);

    const userPackage = new UserPackage({
      userId,
      packageId,
      remainingWashes: packages.washCount,
      expiryDate,
    });

    await userPackage.save();
    res
      .status(201)
      .json({ message: "Package purchased successfully", userPackage });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Package purchase failed", error: error.message });
  }
};

export const sharePackage = async (req, res) => {
  try {
    const { userPackageId, familyMemberId } = req.body;
    const userId = req.session.user._id;

    // Verify the family member exists in user's familyMembers
    const user = await User.findById(userId);
    if (!user.familyMembers.includes(familyMemberId)) {
      return res
        .status(400)
        .json({ message: "User is not in your family members" });
    }

    const userPackage = await UserPackage.findById(userPackageId);
    if (!userPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    if (!userPackage.sharedWith.includes(familyMemberId)) {
      userPackage.sharedWith.push(familyMemberId);
      await userPackage.save();
    }

    res.json({ message: "Package shared successfully", userPackage });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sharing package", error: error.message });
  }
};
export const createPackage = async (req, res) => {
  try {
    const { name, description, price, washCount, validityDays } = req.body;
    const newPackage = new Package({
      name,
      description,
      price,
      washCount,
      validityDays,
    });
    await newPackage.save();
    res
      .status(201)
      .json({ message: "Package created successfully", package: newPackage });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating package", error: error.message });
  }
};

export const updatePackage = async (req, res) => {
  try {
    const { packageId } = req.params._id;
    const updates = req.body;

    const updatedPackage = await Package.findByIdAndUpdate(packageId, updates, {
      new: true,
    });

    if (!updatedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json({
      message: "Package updated successfully",
      package: updatedPackage,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating package", error: error.message });
  }
};

export const deletePackage = async (req, res) => {
  try {
    const { packageId } = req.params._id;

    // Soft delete - set isActive to false
    const deletedPackage = await Package.findByIdAndDelete(
      req.params._id,
      packageId,
      { isActive: false },
      { new: true }
    );

    if (!deletedPackage) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json({
      message: "Package deactivated successfully",
      package: deletedPackage,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deactivating package", error: error.message });
  }
};
