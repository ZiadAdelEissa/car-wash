import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  familyMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  role: {
    type: String,
    enum: ["customer", "branch-admin", "super-admin"],
    // default: 'customer'
  },
  branch: { type: mongoose.Schema.Types.ObjectId, ref: "Branch" }, // Only for branch admins
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
