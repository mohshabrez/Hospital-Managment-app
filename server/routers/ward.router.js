import express from "express";

const router = express.Router();

import {
  addWard,
  editWard,
  deleteWard,
  getAllWards,
} from "../controller/ward.controller.js";

router.route("/").get(getAllWards).post(addWard);

router.post(":/wardId", editWard);

router.delete(":/wardId", deleteWard);

export default router;
