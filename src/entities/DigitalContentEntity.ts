import { ObjectId } from 'mongoose';
import { CategoryEntity } from './CategoryEntity.js';
import { GuideEntity } from './GuideEntity.js';

export interface FileProps {
    path: string;
    filename: string;
}

export interface DigitalContentEntity {
    _id?: ObjectId;
    title: string;
    shortDescription: string;
    category?: CategoryEntity;
    guide: GuideEntity;
    filePaths: FileProps[];
}