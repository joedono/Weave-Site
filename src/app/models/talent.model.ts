import { TitleAndDescriptionModel } from "./title-and-description.model";

export interface TalentModel {
  id: number;
  title: string;
  description: string;
  subQualities: TitleAndDescriptionModel[]
}
