import express from "express";
import multer from "multer";
import {
  deleteMediaFromCloudinary,
  uploadMediaToCloudinary,
} from "../helpers/cloudinary.js";

const mediaRouter = express.Router();
const upload = multer({ dest: "uploads/" });

mediaRouter.post("/upload", upload.single("file"), async (res, req) => {
  try {
    const result = await uploadMediaToCloudinary(req.file.path);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error uplaoding file",
    });
  }
});

mediaRouter.delete("/delete/:id", async (res, req) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({
        success: false,
        message: "Asset id is required",
      });
    }
    await deleteMediaFromCloudinary(id);
    res.status(200).json({
      success: true,
      message: "Asset deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting file",
    });
  }
});

export default mediaRouter;
