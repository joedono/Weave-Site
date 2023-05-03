import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';
import { parse } from 'yaml';
import { PlaysetMetaModel } from '../models/playset-meta.model';

@Injectable({
  providedIn: 'root'
})
export class PlaysetsService {

  private playsetsUrl: string = './assets/playsets.yml';
  private playsets: PlaysetMetaModel[] = [];

  constructor(private http: HttpClient) { }

  getPlaysets(): Observable<PlaysetMetaModel[]> {
    if (this.playsets.length > 0) {
      return of(this.playsets);
    }

    return this.http.get(this.playsetsUrl, {
      observe: 'body',
      responseType: 'text'
    }).pipe(
      map(yamlString => parse(yamlString)),
      map(yaml => this.convertPlaysets(yaml))
    );
  }

  private convertPlaysets(yaml: any): PlaysetMetaModel[] {
    this.playsets = [];
    yaml.forEach((element: PlaysetMetaModel) => {
      element.file = 'assets/' + element.folder + '/' + element.file;
      element.img = 'assets/' + element.folder + '/' + element.img;
      element.glossary = 'assets/' + element.folder + '/' + element.glossary;

      this.playsets.push(element);
    });

    return this.playsets;
  }
}
