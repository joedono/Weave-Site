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

  private diceMaster: string[] = ["Strike", "Stones", "Gales", "Flames", "Brooks", "Weave"];

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
  diceOverride: string = '';
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
    let numDice: number = 3;
    let rollResult: string[] = [];
    let strikes: number = 0;
    let successes: number = 0;

    if (this.diceOverride != '') {
      numDice = parseInt(this.diceOverride);
    } else {
      if (this.isCoreChallenge) {
        if (this.challengeSuit == this.coreSuit) {
          numDice++;
        }
      } else {
        switch (this.challengeSuit) {
          case 'Stones':
            numDice += this.stonesBonus;
            break;
          case 'Gales':
            numDice += this.galesBonus;
            break;
          case 'Flames':
            numDice += this.flamesBonus;
            break;
          case 'Brooks':
            numDice += this.brooksBonus;
            break;
        }
      }
    }

    numDice = Math.min(numDice, 6);

    for (var i = 0; i < numDice; i++) {
      var newDie: string = this.rollDie();
      if (newDie == 'Weave') {
        rollResult.push((i+1) + ' - ' + newDie + ' -> ');
      } else {
        rollResult.push((i+1) + ' - ' + newDie + '\n');
      }

      if (newDie == this.challengeSuit || newDie == 'Weave') {
        successes++;
      }

      if (newDie == 'Strike' && !this.isCoreChallenge) {
        strikes++;
      }

      while (newDie == 'Weave') {
        newDie = this.rollDie();
        if (newDie == 'Weave') {
          rollResult.push(newDie + ' -> ');
        } else {
          rollResult.push(newDie + '\n');
        }

        if (newDie == this.challengeSuit || newDie == 'Weave') {
          successes++;
        }
  
        if (newDie == 'Strike' && !this.isCoreChallenge) {
          strikes++;
        }
      }
    }

    this.rollResult = "Rolling " + numDice + " Dice\n" +
      successes + " Successes - " +
      strikes + " Strikes\n" +
      rollResult.join("");
    this.diceOverride = '';
  }

  private rollDie(): string {
    return this.diceMaster[Math.floor(Math.random() * this.diceMaster.length)];
  }

}
