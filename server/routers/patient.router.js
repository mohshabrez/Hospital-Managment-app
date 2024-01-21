import express from "express";
const router = express.Router();

import {
  addPatient,
  EditPatient,
  deletePatient,
  getAllPatients,
} from "../controller/patient.controller.js";

router.route("/").get(getAllPatients).post(addPatient);

router.post(":/PatientId", EditPatient);

router.delete(":/PatientId", deletePatient);

export default router;
