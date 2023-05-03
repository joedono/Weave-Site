import { BackstoryModel } from "./backstory.model";
import { FlawModel } from "./flaw.model";
import { ItemModel } from "./item.model";
import { SignatureMoveModel } from "./signature-move.model";
import { TalentModel } from "./talent.model";

export class CardModel {
  title: string;
  backstories: BackstoryModel[];
  talents: TalentModel[];
  flaws: FlawModel[];
  signatureMoves: SignatureMoveModel[];
  items: ItemModel[];

  constructor() {
    this.title = '';
    this.backstories = [];
    this.talents = [];
    this.flaws = [];
    this.signatureMoves = [];
    this.items = [];
  }

}
