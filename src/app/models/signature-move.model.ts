import { TitleAndDescriptionModel } from "./title-and-description.model";

export interface SignatureMoveModel {
  id: number;
  title: string;
  description: string;
  subQualities: TitleAndDescriptionModel[]
}
