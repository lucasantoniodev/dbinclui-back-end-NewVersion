import { GuideEntity } from "../../entities/GuideEntity.js";
import { GuideModel } from "../../models/GuideModel.js";
import { GuideRepository } from "../GuideRepository.js";

export class GuideMongoRepository implements GuideRepository {
  database = GuideModel;

  async create(guide: GuideEntity): Promise<GuideEntity> {
    return this.database.create(guide);
  }

  async update(guide: GuideEntity): Promise<number> {
    const result = await this.database.updateOne({ _id: guide._id }, guide);
    return result.modifiedCount;
  }

  async findById(id: string): Promise<GuideEntity | null> {
    return this.database.findById(id);
  }

  async findAll(): Promise<GuideEntity[]> {
    return this.database.find();
  }

  async delete(id: string): Promise<number> {
    const result = await this.database.deleteOne({ _id: id });
    return result.deletedCount;
  }
}
