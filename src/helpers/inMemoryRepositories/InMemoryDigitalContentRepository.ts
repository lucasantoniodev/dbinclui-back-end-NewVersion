import { DigitalContentEntity } from "../../entities/DigitalContentEntity.js";
import { DigitalContentRepository } from "../../repositories/DigitalContentRepository.js";

export class InMemoryDigitalContentRepository
  implements DigitalContentRepository
{
  database: DigitalContentEntity[] = [];

  async create(content: DigitalContentEntity): Promise<DigitalContentEntity> {
    content._id = String(this.database.length);
    this.database.push(content);
    return this.database[this.database.length - 1];
  }

  async update(content: DigitalContentEntity): Promise<number> {
    const result = await this.findById(content._id as string);

    if (!result) {
      return 0;
    }

    const index = this.database.indexOf(result);

    this.database[index] = content;

    return 1;
  }

  async findById(id: string): Promise<DigitalContentEntity | null> {
    const result = this.database.find((guide) => (guide._id as string) === id);
    return result ?? null;
  }

  async findAll(): Promise<DigitalContentEntity[]> {
    return this.database;
  }

  async delete(id: string): Promise<number> {
    const result = await this.findById(id);

    if (!result) {
      return 0;
    }

    const index = this.database.indexOf(result);

    this.database.splice(index, 1);

    return 1;
  }

  async loadData(amount: number) {
    for (let i = 0; i < amount; i++) {
      const contentExample: DigitalContentEntity = {
        _id: String(this.database.length),
        title: `Título do conteúdo digital ${this.database.length}`,
        shortDescription: `Descrição do conteúdo digital`,
        guide: {
          _id: String(this.database.length),
          title: `Título do guia ${this.database.length}`,
          content: `Conteúdo do guia ${this.database.length}`,
        },
        category: {
          _id: String(this.database.length),
          title: `Título da categoria ${this.database.length}`,
          shortDescription: `Descrição da categoria ${this.database.length}`,
          guide: {
            _id: String(this.database.length),
            title: `Título do guia ${this.database.length}`,
            content: `Conteúdo do guia ${this.database.length}`,
          },
        },
        filePaths: [
          {
            filename: `arquivo${this.database.length}`,
            path: `link.com/arquivo${this.database.length}`,
          },
        ],
      };

      this.database.push(contentExample);
    }
  }

  async clear() {
    this.database = [];
  }

  async updateMediaByPublicId(
    public_id: string,
    newPath: string,
    newFilename: string
  ): Promise<number> {
    let indexPath = 1234567489;
    const content = this.database.find((guide) => {
      return guide.filePaths.find((paths, index) => {
        if (paths.filename === public_id) {
          indexPath = index;
        }
        return paths.filename === public_id;
      });
    });

    if (!content) {
      return 0;
    }

    const index = this.database.indexOf(content);

    content.filePaths[indexPath].filename = newFilename;
    content.filePaths[indexPath].path = newPath;

    this.database[index] = content;

    return 1;
  }

  async findMediaByPublicId(
    public_id: string
  ): Promise<DigitalContentEntity | null> {
    const content = this.database.find((guide) => {
      return guide.filePaths.find((paths) => {
        return paths.filename === public_id;
      });
    });

    return content ?? null;
  }

  async findByCategoryId(id: string): Promise<DigitalContentEntity[]> {
    const content = this.database.filter((guide) => guide.category._id === id);

    return content ?? [];
  }
}
