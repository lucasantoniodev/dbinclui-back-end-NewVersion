import { Router } from "express";
import { uploadCloudinary } from "../../configs/multer/multerCloudinaryStorageConfig.js";
import { createDigitalContentController } from "../../controllers/digitalContents/CreateDigitalContentController.js";
import { bodyRequestMiddleware } from "../../middlewares/digitalContents/bodyRequestMiddleware.js";
import { digitalContentRequestMiddleware } from "../../middlewares/digitalContents/digitalContentRequestMiddleware.js";
import { digitalContentRequestValidator } from "../../middlewares/digitalContents/digitalContentRequestValidator.js";
import { v2 as cloudinary } from "cloudinary";
import { Cloudinary } from "../../database/Cloudinary.js";

const digitalContentsRouter = Router();

digitalContentsRouter.post(
  "/",
  uploadCloudinary.array("files"),
  bodyRequestMiddleware,
  digitalContentRequestValidator("post"),
  digitalContentRequestMiddleware,
  createDigitalContentController.handler
);

export { digitalContentsRouter };
