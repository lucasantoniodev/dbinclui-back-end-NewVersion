import { ObjectId } from "mongoose";

export interface GuideEntity {
  _id?: ObjectId | string;
  title: string;
  content: string;
}
