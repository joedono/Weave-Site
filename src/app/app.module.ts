import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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

@NgModule({
  declarations: [
    AppComponent,
    PlaysetsComponent,
    CreationTypeComponent,
    NewCharacterComponent,
    ExistingCharacterComponent,
    CardComponent,
    QualityComponent,
    NameComponent,
    CharacterSheetComponent,
    CharacterSheetPrintComponent,
    GlossaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
