import { Router } from "express";
import { createGuideController } from "../../controllers/guides/CreateGuideController.js";
import { deleteGuideController } from "../../controllers/guides/DeleteGuideController.js";
import { getAllGuidesController } from "../../controllers/guides/GetAllGuidesController.js";
import { getByIdGuideController } from "../../controllers/guides/GetByIdGuideController.js";
import { updateGuideController } from "../../controllers/guides/UpdateGuideController.js";
import { guideRequestMiddleware } from "../../middlewares/guides/guideRequestMiddleware.js";
import { guideRequestValidator } from "../../middlewares/guides/validators/guideRequestValidator.js";

const guidesRouter = Router();

guidesRouter.post(
  "/",
  guideRequestValidator("post"),
  guideRequestMiddleware,
  createGuideController.handler
);

guidesRouter.put(
  "/:id",
  guideRequestValidator("put"),
  guideRequestMiddleware,
  updateGuideController.handler
);

guidesRouter.get("/", getAllGuidesController.handler);

guidesRouter.get(
  "/:id",
  guideRequestValidator("get"),
  guideRequestMiddleware,
  getByIdGuideController.handler
);

guidesRouter.delete(
  "/:id",
  guideRequestValidator("delete"),
  guideRequestMiddleware,
  deleteGuideController.handler
);

export { guidesRouter };
