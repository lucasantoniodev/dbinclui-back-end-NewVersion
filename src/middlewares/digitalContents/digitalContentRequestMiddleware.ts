import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { getByIdCategoryController } from "../../controllers/categories/GetByIdCategoryController.js";
import { CategoryMongoRepository } from "../../repositories/mongoRepositories/CategoryMongoRepository.js";
import { GuideMongoRepository } from "../../repositories/mongoRepositories/GuideMongoRepository.js";
import { clientErrorResponse } from "../../responses/appResponses.js";
import { GetByIdCategoryService } from "../../services/categories/GetByIdCategoryService.js";
import { GetByIdGuideService } from "../../services/guides/GetByIdGuideService.js";

export const digitalContentRequestMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessage = errors.array();
    return clientErrorResponse(res, errorMessage);
  }
  const { guide, category } = req.body;

  if (req.method === "POST" || (req.method === "PUT" && guide)) {
    const guideRepository = new GuideMongoRepository();
    const guideService = new GetByIdGuideService(guideRepository);

    const resultGuide = await guideService.execute(guide);
    if (resultGuide instanceof Error) {
      return clientErrorResponse(res, resultGuide);
    }
  }

  if (req.method === "POST" || (req.method === "PUT" && category)) {
    const categoryRepository = new CategoryMongoRepository();
    const categoryService = new GetByIdCategoryService(categoryRepository);

    const resultCategory = await categoryService.execute(category);
    if (resultCategory instanceof Error) {
      return clientErrorResponse(res, resultCategory);
    }
  }

  next();
};
