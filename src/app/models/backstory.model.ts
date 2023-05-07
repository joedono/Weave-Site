import { TitleAndDescriptionModel } from "./title-and-description.model";

export class BackstoryModel {
  id: number;
  type: string;
  card: string;
  title: string;
  description: string;
  subQualities: TitleAndDescriptionModel[];

  constructor() {
    this.id = 0;
    this.type = 'Backstory';
    this.card = '';
    this.title = '',
    this.description = '';
    this.subQualities = []
  }
  
}
