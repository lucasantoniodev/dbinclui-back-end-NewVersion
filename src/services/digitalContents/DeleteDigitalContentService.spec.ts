import { InMemoryDigitalContentRepository } from "../../helpers/inMemoryRepositories/InMemoryDigitalContentRepository";
import { DeleteDigitalContentService } from "./DeleteDigitalContentService";

describe("DeleteDigitalContentService", () => {
  let repository: InMemoryDigitalContentRepository;
  let contentService: DeleteDigitalContentService;

  beforeAll(async () => {
    repository = new InMemoryDigitalContentRepository();
    contentService = new DeleteDigitalContentService(repository);
    await repository.loadData(1);
  });

  it("Should return an Error if ID not found", async () => {
    const result = await contentService.execute("123");

    expect(result).toBeInstanceOf(Error);
  });

  it("Should return 1 and delete a content", async () => {
    const result = await contentService.execute("0");

    expect(result).toEqual(1);
    expect(repository.database.length).toEqual(0);
  });
});
