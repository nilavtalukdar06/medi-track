import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    occupation: {
      type: String,
      required: [true, "occupation is required"],
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "gender is required"],
    },
    date_of_birth: {
      type: String,
      required: [true, "date of birth is required"],
    },
    medical_conditions: {
      type: String,
      required: [true, "medical conditions are required"],
    },
    current_medications: {
      type: String,
      required: [true, "current medications are required"],
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userModel =
  mongoose.models.userModel || mongoose.model("userModel", userSchema);

export default userModel;
