import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaysetsComponent } from './components/playsets/playsets.component';
import { CreationTypeComponent } from './components/creation-type/creation-type.component';
import { NewCharacterComponent } from './components/new-character/new-character.component';
import { ExistingCharacterComponent } from './components/existing-character/existing-character.component';
import { CardComponent } from './components/card/card.component';
import { QualityComponent } from './components/quality/quality.component';
import { NameComponent } from './components/name/name.component';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { CharacterSheetPrintComponent } from './components/character-sheet-print/character-sheet-print.component';
import { GlossaryComponent } from './components/glossary/glossary.component';

const routes: Routes = [
  { path: 'glossary', component: GlossaryComponent },
  { path: 'print', component: CharacterSheetPrintComponent },
  { path: 'character-sheet', component: CharacterSheetComponent },
  { path: 'name', component: NameComponent },
  { path: 'quality', component: QualityComponent },
  { path: 'card', component: CardComponent },
  { path: 'existing-character', component: ExistingCharacterComponent },
  { path: 'new-character', component: NewCharacterComponent },
  { path: 'creation', component: CreationTypeComponent },
  { path: 'playsets', component: PlaysetsComponent },
  { path: '', component: PlaysetsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
