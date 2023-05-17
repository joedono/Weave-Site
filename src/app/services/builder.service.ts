import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlaysetMetaModel } from '../models/playset-meta.model';
import { Observable, map, tap } from 'rxjs';
import { parse } from 'yaml';
import { PlaysetModel } from '../models/playset.model';
import { CardModel } from '../models/card.model';
import { BackstoryModel } from '../models/backstory.model';
import { TalentModel } from '../models/talent.model';
import { FlawModel } from '../models/flaw.model';
import { SignatureMoveModel } from '../models/signature-move.model';
import { ItemModel } from '../models/item.model';
import { QualityModel } from '../models/quality.model';

@Injectable({
  providedIn: 'root'
})
export class BuilderService {

  cards: string[] = [
    'Dawn', 'Stag', 'Owl', 'Serpent', 'Tortoise', 'Mountain', 'Storm', 'Inferno',
    'River', 'Crown', 'Coin', 'Tome', 'Mask', 'Woods', 'Watchtower', 'Gateway',
    'Gallows', 'Assassin', 'Wanderer', 'Architect', 'Herald', 'Dusk'
  ]

  private playsetMeta: PlaysetMetaModel;
  private playsetDataUrl: string = '';
  private playset!: PlaysetModel;
  private coreSuit: string | undefined;
  private currentLevel: number = 1;
  private endLevel: number = 0;
  private currentCard: string = '';
  private qualities: QualityModel[] = [];
  private name: string = '';

  constructor(private http: HttpClient) {
    this.playsetMeta = new PlaysetMetaModel();
   }

  getCards(): string[] {
    return this.cards;
  }

  setPlayset(playsetMeta: PlaysetMetaModel): Observable<any> {
    this.playsetMeta = playsetMeta;
    this.playsetDataUrl = this.playsetMeta.file;

    return this.initPlaysetData();
  }

  private initPlaysetData(): Observable<any> {
    return this.http.get(this.playsetDataUrl, {
      observe: 'body',
      responseType: 'text'
    }).pipe(
      map(yamlString => parse(yamlString)),
      tap(yaml => this.convertPlayset(yaml))
    );
  }

  private convertPlayset(yaml: any): void {
    this.playset = new PlaysetModel();
    this.playset.name = this.playsetMeta.name;

    for (let i in this.cards) {
      this.playset.cards.push(this.convertCard(this.cards[i], yaml[this.cards[i]]));
    }
  }

  private convertCard(title: string, yaml: any): CardModel {
    let card = new CardModel();

    card.title = title;
    card.backstories = yaml.Backstories as BackstoryModel[];
    card.talents = yaml.Talents as TalentModel[];
    card.flaws = yaml.Flaws as FlawModel[];
    card.signatureMoves = yaml["Signature Move"] as SignatureMoveModel[];
    card.items = yaml.Inventory as ItemModel[];

    card.backstories.forEach(backstory => {
      backstory.card = card.title;
      backstory.type = 'Backstory';
      backstory.subQualities = backstory.subQualities.filter(q => {
        return q.title != "Storyteller";
      });
    });
    card.talents.forEach(talent => {
      talent.card = card.title;
      talent.type = 'Talent';
      talent.subQualities = talent.subQualities.filter(q => {
        return q.title != "Storyteller";
      });
    });
    card.flaws.forEach(flaw => {
      flaw.card = card.title;
      flaw.type = 'Flaw';
      flaw.subQualities = flaw.subQualities.filter(q => {
        return q.title != "Storyteller";
      });
    });
    card.signatureMoves.forEach(signatureMove => {
      signatureMove.card = card.title;
      signatureMove.type = 'Signature Move';
      signatureMove.subQualities = signatureMove.subQualities.filter(q => {
        return q.title != "Storyteller";
      });
    });
    card.items.forEach(item => {
      item.card = card.title;
      item.type = 'Item';
      item.subQualities = item.subQualities.filter(q => {
        return q.title != "Storyteller";
      });
    });

    return card;
  }

  setCurrentLevel(level: number): void {
    let currentLevel: number = level;

    // Add 1 to account for picking both a Talent and a Flaw at level 5
    if (level >= 5) {
      currentLevel++;
    }

    // Add 3 to account for picking a Backstory, Talent, Flaw, and Item at level 1
    if (level > 1) {
      currentLevel += 3;
    }

    this.currentLevel = currentLevel;
  }

  getCurrentLevel(): number {
    if (this.currentLevel <= 4) {
      return 1;
    } else if (this.currentLevel <= 8) {
      return this.currentLevel - 3;
    } else {
      return this.currentLevel - 4;
    }
  }

  setEndLevel(level: number): void {
    // Add 1 to account for picking both a Talent and a Flaw at level 5
    if (level >= 5) {
      level += 1;
    }

    // Add 3 to account for picking a Backstory, Talent, Flaw, and Item at level 1
    level += 3;
    this.endLevel = level;
  }

  setCoreSuit(suit: string): void {
    this.coreSuit = suit;
  }

  getCurrentCard(): string {
    return this.currentCard;
  }

  setCurrentCard(card: string): void {
    this.currentCard = card;
  }

  getCurrentQualityType(): string {
    switch(this.currentLevel) {
      case 1:
      case 5:
      case 7:
      case 12:
        return "Backstory";
      case 2:
      case 6:
      case 8:
      case 10:
      case 13:
      case 14:
        return "Talent";
      case 3:
      case 9:
        return "Flaw";
      case 11:
      case 15:
        return "Signature Move";
      case 4:
        return "Item";
    }

    return '';
  }

  getCurrentQualities(): QualityModel[] {
    let cardIndex = this.cards.indexOf(this.currentCard);
    switch(this.currentLevel) {
      case 1:
      case 5:
      case 7:
      case 12:
        return this.playset.cards[cardIndex].backstories;
      case 2:
      case 6:
      case 8:
      case 10:
      case 13:
      case 14:
        return this.playset.cards[cardIndex].talents;
      case 3:
      case 9:
        return this.playset.cards[cardIndex].flaws;
      case 11:
      case 15:
        return this.playset.cards[cardIndex].signatureMoves;
      case 4:
        return this.playset.cards[cardIndex].items;
    }

    return [];
  }

  addQuality(quality: QualityModel): void {
    this.qualities.push(quality);
    this.currentLevel++;
  }

  addQualities(qualityKeys: string[]): void {
    qualityKeys.forEach(key => {
      this.qualities.push(this.getQuality(key));
    });
  }

  getQuality(key: string): QualityModel {
    let splitKey = key.split('-');
    let qualityCardTitle = splitKey[0];
    let qualityType = splitKey[1];
    let qualityId = parseInt(splitKey[2]);
    let card: CardModel = new CardModel();

    this.playset.cards.forEach(cardLocal => {
      if (cardLocal.title == qualityCardTitle) {
        card = cardLocal;
      }
    });

    let qualityResult: QualityModel = new BackstoryModel();

    switch(qualityType) {
      case 'Backstory':
        card.backstories.forEach(quality => {
          if (quality.id == qualityId){
            qualityResult = quality;
          }
        });
        break;
      case 'Talent':
        card.talents.forEach(quality => {
          if (quality.id == qualityId){
            qualityResult = quality;
          }
        });
        break;
      case 'Flaw':
        card.flaws.forEach(quality => {
          if (quality.id == qualityId){
            qualityResult = quality;
          }
        });
        break;
      case 'Signature Move':
        card.signatureMoves.forEach(quality => {
          if (quality.id == qualityId){
            qualityResult = quality;
          }
        });
        break;
      case 'Item':
        card.items.forEach(quality => {
          if (quality.id == qualityId){
            qualityResult = quality;
          }
        });
        break;
    }

    return qualityResult;
  }

  getNextCardQualityRoute(): string {
    if (this.currentLevel > this.endLevel) {
      return 'name';
    }

    return 'card';
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getCharacterQueryString(): any {
    this.currentLevel--;
    let queryParams = {
      playset: this.playsetMeta.folder,
      name: this.name,
      level: this.getCurrentLevel(),
      suit: this.coreSuit,
      character: Array<string>()
    };

    this.qualities.forEach(quality => {
      let qualityStr = quality.card + "-" + quality.type + "-" + quality.id;
      queryParams.character.push(qualityStr);
    });

    return queryParams;
  }

  reset(): void {
    this.playsetMeta = new PlaysetMetaModel();
    this.playsetDataUrl = '';
    this.playset = new PlaysetModel();
    this.coreSuit = undefined;
    this.currentLevel = 1;
    this.endLevel = 0;
    this.currentCard = '';
    this.qualities = [];
    this.name = '';
  }
}
