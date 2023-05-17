import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PlaysetsComponent } from './components/playsets/playsets.component';
import { CreationTypeComponent } from './components/creation-type/creation-type.component';
import { NewCharacterComponent } from './components/new-character/new-character.component';
import { LevelUpCharacterComponent } from './components/level-up-character/level-up-character.component';
import { CardComponent } from './components/card/card.component';
import { QualityComponent } from './components/quality/quality.component';
import { NameComponent } from './components/name/name.component';
import { CharacterSheetComponent } from './components/character-sheet/character-sheet.component';
import { CharacterSheetPrintComponent } from './components/character-sheet-print/character-sheet-print.component';
import { GlossaryComponent } from './components/glossary/glossary.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ButtonsComponent } from './components/_buttons/buttons.component';
import { ImportCharacterComponent } from './components/import-character/import-character.component';
import { SuitsComponent } from './components/_suits/suits.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaysetsComponent,
    CreationTypeComponent,
    NewCharacterComponent,
    LevelUpCharacterComponent,
    CardComponent,
    QualityComponent,
    NameComponent,
    CharacterSheetComponent,
    CharacterSheetPrintComponent,
    GlossaryComponent,
    ButtonsComponent,
    ImportCharacterComponent,
    SuitsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MarkdownModule.forRoot({ loader: HttpClient })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
