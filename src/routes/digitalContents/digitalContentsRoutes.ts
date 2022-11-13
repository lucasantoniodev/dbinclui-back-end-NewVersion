import { Request, Response, Router } from "express";
import multer from "multer";
import { uploadCloudinary } from "../../configs/multer/multerCloudinaryStorageConfig.js";
import { FileProps } from "../../entities/DigitalContentEntity.js";
import { DigitalContentModel } from "../../models/DigitalContentModel.js";

const digitalContentsRouter = Router();

digitalContentsRouter.post(
  "/",
  uploadCloudinary.array("files"),
  async (req: Request, res: Response) => {
    const files: FileProps[] = req.files as FileProps[];
   
    const result = await DigitalContentModel.create({
      title: "Título",
      shortDescription: "Descrição",
      category: "636fc3c7f59e4b264e7272b0",
      guide: "636fc3b5f59e4b264e7272ad",
      filePaths: files,
    });

    return res.json({ route: "Rota de digitalContents" });
  }
);

export { digitalContentsRouter };
