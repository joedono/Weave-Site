import { TitleAndDescriptionModel } from "./title-and-description.model";

export interface FlawModel {
  id: number;
  title: string;
  description: string;
  subQualities: TitleAndDescriptionModel[]
}
