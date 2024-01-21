import { Patient } from "../models/patient.model.js";

const addPatient = async (req, res) => {
  try {
    const patientDetails = req.body;
    if (
      patientDetails.name &&
      patientDetails.age &&
      patientDetails.gender &&
      patientDetails.medicalHistory &&
      patientDetails.contactInformation &&
      patientDetails.wardNumber
    ) {
      const patient = new Patient(patientDetails);

      const savedPatient = await patient.save();
      if (savedPatient) {
        return res
          .status(200)
          .json({ data: savedPatient, message: "Patient saved to database" });
      } else {
        return res
          .status(400)
          .json({ message: "Error occured while saving the patient" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Please provide all the required patient Fields" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occuered while adding the patients" });
  }
};

const EditPatient = async (req, res) => {
  try {
    const patientId = req.params.PatientId;
    console.log(patientId);
    const {
      name,
      age,
      gender,
      medicalHistory,
      contactInformation,
      wardNumber,
    } = req.body;
    if (
      name &&
      age &&
      gender &&
      medicalHistory &&
      contactInformation &&
      wardNumber
    ) {
      const editedPatient = await Patient.findByIdAndUpdate(
        patientId,
        {
          name,
          age,
          gender,
          medicalHistory,
          contactInformation,
          wardNumber,
        },
        { new: true },
      );
      if (editedPatient) {
        return res.status(200).json({
          data: editedPatient,
          message: "Edited Patient saved to database",
        });
      } else {
        return res
          .status(400)
          .json({ message: "Error occured while editing the patient" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "Please provide all the required patient Fields" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occuered while editing the patients" });
  }
};

const deletePatient = async (req, res) => {
  try {
    const patientId = req.params.PatientId;
    if (patientId) {
      const deletePatient = await Patient.findByIdAndDelete(patientId);
      return res
        .status(200)
        .json({ message: "Successfully deleted the patientId" });
    } else {
      return res
        .status(400)
        .json({ message: "error ocuured while deleting the patientId" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occuered while deleting the patients" });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const allPatients = await Patient.find();
    return res.status(200).json(allPatients);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occuered while fetchng the patients" });
  }
};

export {
  addPatient,
  EditPatient,
  deletePatient,
  getAllPatients,
};
