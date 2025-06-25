import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: String,
    required: [true, "doctor's name is required"],
  },
  reason_for_appointment: {
    type: String,
    required: [true, "reason is required"],
  },
  additional_comments: {
    type: String,
    required: [true, "additional comments are required"],
  },
  expected_date: {
    type: String,
    required: [true, "date is required"],
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "cancelled"],
    required: true,
    default: "pending",
  },
  created_by: {
    type: String,
    required: true,
  },
});

const appointmentModel =
  mongoose.models.appointmentModel ||
  mongoose.model("appointmentModel", appointmentSchema);

export default appointmentModel;
