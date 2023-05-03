import { BackstoryModel } from "./backstory.model";
import { FlawModel } from "./flaw.model";
import { ItemModel } from "./item.model";
import { SignatureMoveModel } from "./signature-move.model";
import { TalentModel } from "./talent.model";

export interface CardModel {
  title: string;
  backstories: BackstoryModel[];
  talents: TalentModel[];
  flaws: FlawModel[];
  signatureMoves: SignatureMoveModel[];
  items: ItemModel[];
}
