import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackstoryModel } from 'src/app/models/backstory.model';
import { FlawModel } from 'src/app/models/flaw.model';
import { ItemModel } from 'src/app/models/item.model';
import { PlaysetMetaModel } from 'src/app/models/playset-meta.model';
import { PlaysetModel } from 'src/app/models/playset.model';
import { QualityModel } from 'src/app/models/quality.model';
import { SignatureMoveModel } from 'src/app/models/signature-move.model';
import { TalentModel } from 'src/app/models/talent.model';
import { BuilderService } from 'src/app/services/builder.service';
import { PlaysetsService } from 'src/app/services/playsets.service';

@Component({
  selector: 'app-character-sheet',
  templateUrl: './character-sheet.component.html',
  styleUrls: ['./character-sheet.component.less']
})
export class CharacterSheetComponent implements OnInit {

  private diceMaster: string[] = ["Strike", "Stones", "Gales", "Flames", "Brooks", "Weave"];

  characterData: string[] = [];
  playsetMeta: PlaysetMetaModel = new PlaysetMetaModel();
  playset: PlaysetModel = new PlaysetModel();

  name: string = '';
  level: number = 0;
  coreSuit: string = '';
  glossaryPath: string = '';
  playsetId: string = '';

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
    private route: ActivatedRoute,
    private playsetService: PlaysetsService,
    private builderService: BuilderService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params);

      this.playsetId = params['playset'];
      this.name = params['name'];
      this.level = params['level'];
      this.coreSuit = params['suit'];
      this.characterData = params['character'];

      this.characterData.forEach(data => {
        this.characterConfigs += data + '\r\n';
      });

      this.playsetService.getPlayset(this.playsetId).subscribe(playsetMeta => {
        this.playsetMeta = playsetMeta;
        this.builderService.setPlayset(this.playsetMeta).subscribe(_ =>{
          this.characterData.forEach(data => {
            let quality = this.builderService.getQuality(data);
            switch(quality.type) {
              case 'Backstory':
                this.backstories.push(quality);
                this.addSuitBonus(quality);
                break;
              case 'Talent':
                this.talents.push(quality);
                break;
              case 'Flaw':
                this.flaws.push(quality);
                break;
              case 'Signature Move':
                this.signatureMoves.push(quality);
                break;
              case 'Item':
                this.items.push(quality);
                break;
            }
            
            // TODO retrieve qualities
            // TODO assemble suit bonuses
          });
        });
      });
    });
  }

  private addSuitBonus(backstory: QualityModel): void {
    backstory.subQualities.forEach(subQuality => {
      if (subQuality.title == 'Suits'){
        
      }
    });
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
