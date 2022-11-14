import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { CategoryMongoRepository } from "../../repositories/mongoRepositories/CategoryMongoRepository.js";
import { GuideMongoRepository } from "../../repositories/mongoRepositories/GuideMongoRepository.js";
import { clientErrorResponse } from "../../responses/appResponses.js";
import { GetByIdCategoryService } from "../../services/categories/GetByIdCategoryService.js";
import { GetByIdGuideService } from "../../services/guides/GetByIdGuideService.js";
import { deleteContentCloudinary } from "../../utils/cloudinary/deleteContentCloudinary.js";

export interface FileRequest {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  path: string;
  size: number;
  filename: string;
}

export const digitalContentRequestMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const files = req.files as FileRequest[];

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    deleteContentCloudinary(files);
    const errorMessage = errors.array();
    return clientErrorResponse(res, errorMessage);
  }

  const { guide, category } = req.body;

  if (req.method === "POST" || (req.method === "PUT" && guide)) {
    const guideRepository = new GuideMongoRepository();
    const guideService = new GetByIdGuideService(guideRepository);

    const resultGuide = await guideService.execute(guide);
    if (resultGuide instanceof Error) {
      deleteContentCloudinary(files);
      return clientErrorResponse(res, resultGuide);
    }
  }

  if (req.method === "POST" || (req.method === "PUT" && category)) {
    const categoryRepository = new CategoryMongoRepository();
    const categoryService = new GetByIdCategoryService(categoryRepository);

    const resultCategory = await categoryService.execute(category);
    if (resultCategory instanceof Error) {
      deleteContentCloudinary(files);
      return clientErrorResponse(res, resultCategory);
    }
  }

  next();
};
