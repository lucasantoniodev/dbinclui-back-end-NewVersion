import { Request, Response } from "express";
import { DigitalContentMongoRepository } from "../../repositories/mongoRepositories/DigitalContentMongoRepository.js";
import {
  serverErrorResponse,
  sucessfulResponse,
} from "../../responses/appResponses.js";
import { CreateDigitalContentService } from "../../services/digitalContents/CreateDigitalContentService.js";

class CreateDigitalContentController {
  async handler(req: Request, res: Response) {
    try {
      const body = req.body;

      const digitalContentRepository = new DigitalContentMongoRepository();
      const digitalContentService = new CreateDigitalContentService(
        digitalContentRepository
      );

      const result = await digitalContentService.execute(body);

      return sucessfulResponse(res, result);
    } catch (error) {
      return serverErrorResponse(res, error as Error);
    }
  }
}
