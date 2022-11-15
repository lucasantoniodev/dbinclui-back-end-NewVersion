import { Request, Response } from "express";
import { FileProps } from "../../entities/DigitalContentEntity.js";
import { DigitalContentMongoRepository } from "../../repositories/mongoRepositories/DigitalContentMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { UpdateMediaDigitalContentService } from "../../services/digitalContents/UpdateMediaDigitalContentService.js";
import { v2 as cloudinary } from "cloudinary";

class UpdateMediaDigitalContentController {
  async handler(req: Request, res: Response) {
    try {
      const publicId = `uploads/${req.params["id"]}`;
      const [file] = req.files as FileProps[];

      const contentRepository = new DigitalContentMongoRepository();
      const contentService = new UpdateMediaDigitalContentService(
        contentRepository
      );

      const result = await contentService.execute(
        publicId,
        file.path,
        file.filename
      );

      if (result instanceof Error) {
        await cloudinary.api.delete_resources([file.filename]);
        return clientErrorResponse(res, result);
      }
      // <--- Remove OLD content from the database (Cloudinary) --->
      await cloudinary.api.delete_resources([publicId]);
      
      return sucessfulResponse(res, result);
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const updateMediaDigitalContentController =
  new UpdateMediaDigitalContentController();
