import { Ward } from "../models/ward.model.js"

const addWard = async (req, res) => {
  try {
    const { wardNumber, capacity, specialization } = req.body;
    if (wardNumber && capacity && specialization) {
      const WardData = new Ward(req.body);
      const savedWard = await WardData.save();
      return res.status(200).json({
        data: savedWard,
        message: "Ward added successfully",
      });
    } else {
      return res.status(400).json({ message: "Ward details are missing" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: error, message: "Error ocuuered while adding the ward" });
  }
};

const editWard = async (req, res) => {
  try {
    const wardId = req.params.wardId;
    const wardDetails = req.body;
    const { wardNumber, capacity, specialization } = wardDetails;
    if (wardNumber && capacity && specialization) {
      const savedWardDetails = await Ward.findByIdAndUpdate(
        wardId,
        wardDetails,
        { new: true },
      );
      return res
        .status(200)
        .json({ data: savedWardDetails, message: "Ward details updated" });
    } else {
      return res.status(400).json({ message: "Ward details are missing" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, message: "Error ocuuered while adding the ward" });
  }
};

const deleteWard = async (req, res) => {
  try {
    const wardId = req.params.wardId;
    if (wardId) {
      const deletedWard = await Ward.findByIdAndDelete(wardId);
      return res
        .status(200)
        .json({ data: deletedWard, message: "Ward deleted" });
    } else {
      return res.status(400).json({ message: "Ward id is missing" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: error, message: "Error occured while deleting the ward" });
  }
};

const getAllWards = async (req, res) => {
  try {
    const wards = await Ward.find({});
    if (wards) {
      return res.status(200).json(wards);
    } else {
      return res.status(400).json({ message: "No wards found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error occured while fetching the wards" });
  }
};

export {
  addWard,
  editWard,
  deleteWard,
  getAllWards,
};
