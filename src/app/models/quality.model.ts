import { TitleAndDescriptionModel } from "./title-and-description.model";

export interface QualityModel {
  id: number;
  title: string;
  description: string;
  subQualities: TitleAndDescriptionModel[];
}
