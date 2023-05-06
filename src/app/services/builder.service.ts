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
  private playset: PlaysetModel | undefined;
  private coreSuit: string | undefined;
  private currentLevel: number = 0;
  private endLevel: number = 0;
  private currentCard: string = '';

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
    card.signatureMoves = yaml["Signature Moves"] as SignatureMoveModel[];
    card.items = yaml.Inventory as ItemModel[];

    return card;
  }

  setCurrentLevel(level: number): void {
    this.currentLevel = level;
  }

  getCurrentLevel(): number {
    return this.currentLevel;
  }

  setEndLevel(level: number): void {
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
    // TODO BuilderService.getCurrentQualityType
  }

  getCurrentQualities(): QualityModel[] {
    // TODO BuilderService.getCurrentQualities
  }

  addQuality(quality: QualityModel): void {
    // TODO BuilderService.addQuality
  }

  getNextCardQualityRoute(): string {
    // TODO BuilderService.getNextCardQualityRoute
  }

  reset(): void {
    // TODO BuilderService.reset
  }
}
