import { DigitalContentEntity } from "../../entities/DigitalContentEntity.js";
import { DigitalContentRepository } from "../../repositories/DigitalContentRepository.js";

export class UpdateDigitalContentService {
  constructor(private readonly repository: DigitalContentRepository) {}

  async execute(id: string, contentRequest: DigitalContentEntity) {
    try {
      const content = await this.repository.findById(id);

      if (!content) {
        return new Error("Digital Content does not exists");
      }

      contentRequest._id = content._id;
      const result = await this.repository.update(contentRequest);

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
