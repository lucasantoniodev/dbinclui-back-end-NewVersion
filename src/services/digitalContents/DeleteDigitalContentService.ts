import { DigitalContentRepository } from "../../repositories/DigitalContentRepository.js";

export class DeleteDigitalContentService {
  constructor(private readonly repository: DigitalContentRepository) {}

  async execute(id: string) {
    try {
      const content = await this.repository.findById(id);

      if (!content) {
        return new Error("Digital Content with this ID does not exists");
      }

      const result = await this.repository.delete(id);

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
