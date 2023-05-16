import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackstoryModel } from 'src/app/models/backstory.model';
import { FlawModel } from 'src/app/models/flaw.model';
import { ItemModel } from 'src/app/models/item.model';
import { PlaysetMetaModel } from 'src/app/models/playset-meta.model';
import { QualityModel } from 'src/app/models/quality.model';
import { SignatureMoveModel } from 'src/app/models/signature-move.model';
import { TalentModel } from 'src/app/models/talent.model';
import { BuilderService } from 'src/app/services/builder.service';
import { PlaysetsService } from 'src/app/services/playsets.service';

@Component({
  selector: 'app-character-sheet-print',
  templateUrl: './character-sheet-print.component.html',
  styleUrls: ['./character-sheet-print.component.less']
})
export class CharacterSheetPrintComponent implements OnInit {

  playsetMeta: PlaysetMetaModel = new PlaysetMetaModel();

  playsetId: string = '';
  name: string = '';
  level: number = 0;
  coreSuit: string = '';

  characterConfigs: string = '';

  stonesBonus: number = 0;
  galesBonus: number = 0;
  flamesBonus: number = 0;
  brooksBonus: number = 0;

  characterData: string[] = [];

  backstories: BackstoryModel[] = [];
  talents: TalentModel[] = [];
  flaws: FlawModel[] = [];
  signatureMoves: SignatureMoveModel[] = [];
  items: ItemModel[] = [];

  constructor(
    private route: ActivatedRoute,
    private playsetService: PlaysetsService,
    private builderService: BuilderService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.playsetId = params['playset'];
      this.name = params['name'];
      this.level = params['level'];
      this.coreSuit = params['suit'];
      this.characterData = params['character'];

      this.builderService.setCoreSuit(this.coreSuit);
      this.builderService.setName(this.name);
      
      this.parseCharacterData();
    });
  }

  private parseCharacterData(): void {
    this.stonesBonus = 0;
    this.galesBonus = 0;
    this.flamesBonus = 0;
    this.brooksBonus = 0;

    this.characterConfigs = '';
    this.backstories = [];
    this.talents = [];
    this.flaws = [];
    this.signatureMoves = [];
    this.items = [];

    switch (this.coreSuit) {
      case 'Stones':
        this.stonesBonus++;
        break;
      case 'Gales':
        this.galesBonus++;
        break;
      case 'Flames':
        this.flamesBonus++;
        break;
      case 'Brooks':
        this.brooksBonus++;
        break;
    }

    this.characterData.forEach(data => {
      this.characterConfigs += data + '\n';
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
        });
      });
    });
  }

  private addSuitBonus(backstory: QualityModel): void {
    backstory.subQualities.forEach(subQuality => {
      if (subQuality.title == 'Suits') {
        let suits = subQuality.description.split(' ');
        suits.forEach(suit => {
          switch (suit) {
            case 'STONES':
              this.stonesBonus++;
              break;
            case 'GALES':
              this.galesBonus++;
              break;
            case 'FLAMES':
              this.flamesBonus++;
              break;
            case 'BROOKS':
              this.brooksBonus++;
              break;
          }
        });
      }
    });
  }

}
