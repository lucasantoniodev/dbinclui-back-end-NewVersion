import { Router } from "express";
import { uploadCloudinary } from "../../configs/multer/multerCloudinaryStorageConfig.js";
import { createDigitalContentController } from "../../controllers/digitalContents/CreateDigitalContentController.js";
import { bodyRequestMiddleware } from "../../middlewares/digitalContents/bodyRequestMiddleware.js";
import { digitalContentRequestMiddleware } from "../../middlewares/digitalContents/digitalContentRequestMiddleware.js";
import { digitalContentRequestValidator } from "../../middlewares/digitalContents/digitalContentRequestValidator.js";
import { v2 as cloudinary } from "cloudinary";
import { Cloudinary } from "../../database/Cloudinary.js";
import { deleteCategoryController } from "../../controllers/categories/DeleteCategoryController.js";
import { deleteContentRequestMiddleware } from "../../middlewares/digitalContents/deleteContentRequestMiddleware.js";
import { deleteDigitalContentController } from "../../controllers/digitalContents/DeleteDigitaContentController.js";

const digitalContentsRouter = Router();

digitalContentsRouter.post(
  "/",
  uploadCloudinary.array("files"),
  bodyRequestMiddleware,
  digitalContentRequestValidator("post"),
  digitalContentRequestMiddleware,
  createDigitalContentController.handler
);

digitalContentsRouter.delete(
  "/:id",
  digitalContentRequestValidator("delete"),
  deleteContentRequestMiddleware,
  deleteDigitalContentController.handler
);

export { digitalContentsRouter };
