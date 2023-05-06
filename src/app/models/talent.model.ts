import { QualityModel } from "./quality.model";
import { TitleAndDescriptionModel } from "./title-and-description.model";

export class TalentModel implements QualityModel {
  id: number;
  title: string;
  description: string;
  subQualities: TitleAndDescriptionModel[];

  constructor() {
    this.id = 0;
    this.title = '';
    this.description = '';
    this.subQualities = [];
  }
  
}
