import { ObjectId } from 'mongoose';
import { CategoryEntity } from './CategoryEntity.js';
import { GuideEntity } from './GuideEntity.js';

interface FilePaths {
    filePath: string;
    publicId: string;
}

export interface DigitalContentEntity {
    _id?: ObjectId;
    title: string;
    shortDescription: string;
    category?: CategoryEntity;
    guide: GuideEntity;
    filePaths: FilePaths[];
}