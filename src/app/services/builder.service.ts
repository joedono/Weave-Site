import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PlaysetMetaModel } from '../models/playset-meta.model';
import { Observable, map, tap } from 'rxjs';
import { parse } from 'yaml';
import { PlaysetModel } from '../models/playset.model';
import { CardModel } from '../models/card.model';

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

  constructor(private http: HttpClient) {
    this.playsetMeta = new PlaysetMetaModel();
   }

  getCards(): string[] {
    return this.cards;
  }

  setPlayset(playsetMeta: PlaysetMetaModel): Observable<any> {
    this.playsetMeta = playsetMeta;
    this.playsetDataUrl = 'assets/' + this.playsetMeta.folder + '/' + this.playsetMeta.file;

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

    this.playset.cards.push(this.convertCard(yaml.Dawn));
    this.playset.cards.push(this.convertCard(yaml.Stag));
    this.playset.cards.push(this.convertCard(yaml.Owl));
    this.playset.cards.push(this.convertCard(yaml.Serpent));
    this.playset.cards.push(this.convertCard(yaml.Tortoise));
    this.playset.cards.push(this.convertCard(yaml.Mountain));
    this.playset.cards.push(this.convertCard(yaml.Storm));
    this.playset.cards.push(this.convertCard(yaml.Inferno));
    this.playset.cards.push(this.convertCard(yaml.River));
    this.playset.cards.push(this.convertCard(yaml.Crown));
    this.playset.cards.push(this.convertCard(yaml.Coin));
    this.playset.cards.push(this.convertCard(yaml.Tome));
    this.playset.cards.push(this.convertCard(yaml.Mask));
    this.playset.cards.push(this.convertCard(yaml.Woods));
    this.playset.cards.push(this.convertCard(yaml.Watchtower));
    this.playset.cards.push(this.convertCard(yaml.Gateway));
    this.playset.cards.push(this.convertCard(yaml.Gallows));
    this.playset.cards.push(this.convertCard(yaml.Assassin));
    this.playset.cards.push(this.convertCard(yaml.Wanderer));
    this.playset.cards.push(this.convertCard(yaml.Architect));
    this.playset.cards.push(this.convertCard(yaml.Herald));
    this.playset.cards.push(this.convertCard(yaml.Dusk));
  }

  private convertCard(yaml: any): CardModel {

  }

  reset(): void {

  }
}
