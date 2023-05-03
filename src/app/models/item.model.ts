import { TitleAndDescriptionModel } from "./title-and-description.model";

export interface ItemModel {
  id: number;
  title: string;
  description: string;
  subQualities: TitleAndDescriptionModel[]
}
