import { TitleAndDescriptionModel } from "./title-and-description.model";

export interface QualityModel {
  id: number;
  type: string;
  card: string;
  title: string;
  description: string;
  subQualities: TitleAndDescriptionModel[];
}
