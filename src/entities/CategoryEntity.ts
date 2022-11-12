import { GuideEntity } from "./GuideEntity.js";

// export interface CategoryEntity {
//   _id?: String;
//   title: String;
//   shortDescription: String;
//   guideId: String;
// }

export interface CategoryEntity {
    _id?: string;
    title: string;
    shortDescription: string;
    guide: GuideEntity;
}
