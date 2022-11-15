import { DigitalContentRepository } from "../../repositories/DigitalContentRepository.js";

export class UpdateMediaDigitalContentService {
  constructor(private readonly repository: DigitalContentRepository) {}

  async execute(public_id: string, newPath: string, newFilename: string) {
    try {
      const content = await this.repository.findMediaByPublicId(public_id);

      if (!content) {
        return new Error("Digital Content with this Media does not exists");
      }

      const result = await this.repository.updateMediaByPublicId(
        public_id,
        newPath,
        newFilename
      );

      return result;
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
