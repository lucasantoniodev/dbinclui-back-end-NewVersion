import { Request, Response } from "express";
import { DigitalContentMongoRepository } from "../../repositories/mongoRepositories/DigitalContentMongoRepository.js";
import {
  clientErrorResponse,
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { UpdateDigitalContentService } from "../../services/digitalContents/UpdateDigitalContentService.js";

class UpdateDigitalContentController {
  async handler(req: Request, res: Response) {
    try {
      const id = req.params["id"];
      const body = req.body;
      const contentRepository = new DigitalContentMongoRepository();
      const contentService = new UpdateDigitalContentService(contentRepository);

      const result = await contentService.execute(id, body);

      if (result instanceof Error) {
        return clientErrorResponse(res, result);
      }

      return sucessfulResponse(res, result);
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}

export const updateDigitalContentController =
  new UpdateDigitalContentController();
