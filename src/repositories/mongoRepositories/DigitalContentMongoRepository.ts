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

  async findAll(): Promise<DigitalContentEntity[]> {
    return this.database.find();
  }

  async delete(id: string): Promise<number> {
    const result = await this.database.deleteOne({ _id: id });
    return result.deletedCount;
  }
}
