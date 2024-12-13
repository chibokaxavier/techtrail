import express from "express";
import multer from "multer";
import {
  deleteMediaFromCloudinary,
  uploadMediaToCloudinary,
} from "../helpers/cloudinary.js";

const mediaRouter = express.Router();
const upload = multer({ dest: "uploads/" });

mediaRouter.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await uploadMediaToCloudinary(req.file.path);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
});

mediaRouter.delete("/delete/:id", async (req, res) => {
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

mediaRouter.post(
  "/bulk-upload",
  upload.array("files", 10),
  async (req, res) => {
    try {
      const uplaodPromises = req.files.map((fileItem) =>
        uploadMediaToCloudinary(fileItem.path)
      );
      const results = await Promise.all(uplaodPromises);
      res.status(200).json({
        success: true,
        data: results,
      });
    } catch (event) {
      console.log(event);
      res.status(500).json({
        success: false,
        message: "Error in uplaoding files",
      });
    }
  }
);

export default mediaRouter;
