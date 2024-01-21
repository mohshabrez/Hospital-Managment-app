import mongoose from "mongoose";

const wardSchema = new mongoose.Schema(
  {
    wardNumber: {
      type: Number,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    specialization: {
      type: String,
      enum: [
        "General Ward",
        "Emergency Ward",
        "Intensive Care Unit",
        "Cardiac Care Unit",
        "Nursery",
        "Burns Ward",
      ],
      default: "General Ward",
      required: true,
    },
  },
  { timestamps: true },
);

const Ward = mongoose.model("Ward", wardSchema);

export { Ward };
