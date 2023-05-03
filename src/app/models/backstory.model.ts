import { TitleAndDescriptionModel } from "./title-and-description.model";

export interface BackstoryModel {
  id: number;
  title: string;
  description: string;
  subQualities: TitleAndDescriptionModel[]
}
