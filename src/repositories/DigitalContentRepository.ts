import { DigitalContentEntity } from "../entities/DigitalContentEntity.js";

export interface DigitalContentRepository {
  create(content: DigitalContentEntity): Promise<DigitalContentEntity>;
  update(content: DigitalContentEntity): Promise<number>;
  findById(id: string): Promise<DigitalContentEntity | null>;
  findAll(): Promise<DigitalContentEntity[]>;
  delete(id: string): Promise<number>;
}
