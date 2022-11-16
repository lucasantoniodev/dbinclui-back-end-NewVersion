import { Router } from "express";
import { uploadCloudinary } from "../../configs/multer/multerCloudinaryStorageConfig.js";
import { createDigitalContentController } from "../../controllers/digitalContents/CreateDigitalContentController.js";
import { bodyRequestMiddleware } from "../../middlewares/digitalContents/bodyRequestMiddleware.js";
import { createDigitalContentRequestMiddleware } from "../../middlewares/digitalContents/createDigitalContentRequestMiddleware.js";
import { digitalContentRequestValidator } from "../../middlewares/digitalContents/validators/digitalContentRequestValidator.js";
import { deleteContentRequestMiddleware } from "../../middlewares/digitalContents/deleteDigitalContentRequestMiddleware.js";
import { deleteDigitalContentController } from "../../controllers/digitalContents/DeleteDigitaContentController.js";
import { getAllDigitalContentsController } from "../../controllers/digitalContents/GetAllDigitalContentsController.js";
import { getByIdDigitalContentController } from "../../controllers/digitalContents/GetByIdDigitalContentController.js";
import { updateDigitalContentController } from "../../controllers/digitalContents/UpdateDigitalContentController.js";
import { updateDigitalContentMiddleware } from "../../middlewares/digitalContents/updateDigitalContentMiddleware.js";
import { updateMediaDigitalContentController } from "../../controllers/digitalContents/UpdateMediaDigitalContentController.js";
import { DigitalContentMongoRepository } from "../../repositories/mongoRepositories/DigitalContentMongoRepository.js";
import { getByCategoryIdDigitalContentController } from "../../controllers/digitalContents/GetByCategoryIdDigitalContentController.js";

const digitalContentsRouter = Router();

digitalContentsRouter.post(
  "/",
  uploadCloudinary.array("files"),
  bodyRequestMiddleware,
  digitalContentRequestValidator("post"),
  createDigitalContentRequestMiddleware,
  createDigitalContentController.handler
);

digitalContentsRouter.patch(
  "/media/:id",
  uploadCloudinary.array("files"),
  updateMediaDigitalContentController.handler
);

digitalContentsRouter.put(
  "/:id",
  digitalContentRequestValidator("put"),
  updateDigitalContentMiddleware,
  updateDigitalContentController.handler
);

digitalContentsRouter.get("/", getAllDigitalContentsController.handler);

digitalContentsRouter.get(
  "/:id",
  digitalContentRequestValidator("get"),
  deleteContentRequestMiddleware,
  getByIdDigitalContentController.handler
);

digitalContentsRouter.get(
  "/category/:id",
  getByCategoryIdDigitalContentController.handler
);

digitalContentsRouter.delete(
  "/:id",
  digitalContentRequestValidator("delete"),
  deleteContentRequestMiddleware,
  deleteDigitalContentController.handler
);

export { digitalContentsRouter };
