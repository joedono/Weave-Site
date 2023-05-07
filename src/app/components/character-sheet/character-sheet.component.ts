import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackstoryModel } from 'src/app/models/backstory.model';
import { FlawModel } from 'src/app/models/flaw.model';
import { ItemModel } from 'src/app/models/item.model';
import { SignatureMoveModel } from 'src/app/models/signature-move.model';
import { TalentModel } from 'src/app/models/talent.model';
import { BuilderService } from 'src/app/services/builder.service';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.less']
})
export class CharacterSheetComponent implements OnInit {

  characterData: any = {};

  name: string = '';
  level: number = 0;
  coreSuit: string = '';
  glossaryPath: string = '';
  playsetName: string = '';

  stonesBonus: number = 0;
  galesBonus: number = 0;
  flamesBonus: number = 0;
  brooksBonus: number = 0;

  strikes: number = 0;
  wounds: number = 0;

  characterConfigs: string = '';

  challengeSuit: string = '';
  isCoreChallenge: boolean = false;
  diceOverride: number = 0;
  rollResult: string = '';

  backstories: BackstoryModel[] = [];
  talents: TalentModel[] = [];
  flaws: FlawModel[] = [];
  signatureMoves: SignatureMoveModel[] = [];
  items: ItemModel[] = [];

  constructor(
    private router: Router,
    private builderService: BuilderService
  ) { }

  ngOnInit(): void {
    // TODO
  }

  setStrikes(strikes: number): void {
    this.strikes = strikes;
  }

  newScene(): void {
    this.strikes = 0;
  }

  setWounds(wounds: number): void {
    this.wounds = wounds;
  }

  resetStrikesAndWounds(): void {
    this.strikes = 0;
    this.wounds = 0;
  }

  refreshCharacterConfig(): void {
    // TODO
  }

  selectedChallengeSuitEvent(suit: string): void {
    this.challengeSuit = suit;
  }

  rollDice(): void {
    // TODO
  }

}
