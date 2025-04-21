import Service from "../models/Service.js";

// GET all active services
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true });
    res.json(services);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching services", error: error.message });
  }
};

// ADMIN FUNCTIONS
export const createService = async (req, res) => {
  try {
    const { name, description, price, duration } = req.body;
    const newService = new Service({
      name,
      description,
      price,
      duration,
    });
    await newService.save();
    res
      .status(201)
      .json({ message: "Service created successfully", service: newService });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating service", error: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { serviceId } = req.params._id;
    const updates = req.body;

    const updatedService = await Service.findByIdAndUpdate(serviceId, updates, {
      new: true,
    });

    if (!updatedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating service", error: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { serviceId } = req.params._id;

    // Soft delete - set isActive to false
    const deletedService = await Service.findByIdAndUpdate(
      serviceId,
      { isActive: false },
      { new: true }
    );

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    res.json({
      message: "Service deactivated successfully",
      service: deletedService,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deactivating service", error: error.message });
  }
};
