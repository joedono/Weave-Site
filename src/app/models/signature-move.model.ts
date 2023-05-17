import { QualityModel } from "./quality.model";
import { TitleAndDescriptionModel } from "./title-and-description.model";

export class SignatureMoveModel implements QualityModel {
  id: number;
  type: string;
  card: string;
  title: string;
  description: string;
  subQualities: TitleAndDescriptionModel[];

  constructor() {
    this.id = 0;
    this.type = 'SM';
    this.card = '';
    this.title = '';
    this.description = '';
    this.subQualities = [];
  }
  
}
