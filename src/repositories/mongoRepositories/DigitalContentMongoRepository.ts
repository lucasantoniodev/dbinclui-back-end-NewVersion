import { DigitalContentEntity } from "../../entities/DigitalContentEntity.js";
import { DigitalContentModel } from "../../models/DigitalContentModel.js";
import { DigitalContentRepository } from "../DigitalContentRepository.js";

export class DigitalContentMongoRepository implements DigitalContentRepository {
  database = DigitalContentModel;

  async create(guide: DigitalContentEntity): Promise<DigitalContentEntity> {
    return this.database.create(guide);
  }

  async update(guide: DigitalContentEntity): Promise<number> {
    const result = await this.database.updateOne({ _id: guide._id }, guide);
    return result.modifiedCount;
  }

  async findById(id: string): Promise<DigitalContentEntity | null> {
    return this.database.findById(id);
  }

  async findMediaByPublicId(id: string): Promise<DigitalContentEntity | null> {
    return this.database.findOne({ "filePaths.filename": id });
  }

  async updateMediaByPublicId(
    public_id: string,
    newPath: string,
    newFilename: string
  ) {
    const result = await this.database.updateOne(
      { "filePaths.filename": public_id },
      {
        $set: {
          "filePaths.$": {
            // _id: id,
            path: newPath,
            filename: newFilename,
          },
        },
      }
    );
    return result.modifiedCount;
  }

  async findAll(): Promise<DigitalContentEntity[]> {
    return this.database.find();
  }

  async delete(id: string): Promise<number> {
    const result = await this.database.deleteOne({ _id: id });
    return result.deletedCount;
  }
}
