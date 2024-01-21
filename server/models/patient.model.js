import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female"],
      default: "Male",
    },
    medicalHistory: {
      type: String,
      required: true,
    },
    contactInformation: {
      type: Number,
      required: true,
    },
    wardNumber:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ward',
      required: true
    }
  },
  { timestamps: true },
);

const Patient = mongoose.model("Patient", patientSchema);

export { Patient };
