import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuilderService } from 'src/app/services/builder.service';

@Component({
  selector: 'app-import-character',
  templateUrl: './import-character.component.html',
  styleUrls: ['./import-character.component.less']
})
export class ImportCharacterComponent implements OnInit {

  name: string = '';
  suit: string = '';
  level: number = 1;
  characterConfigs: string = '';

  constructor(
    private router: Router,
    private builderService: BuilderService
  ) { }

  ngOnInit(): void {
    if (!this.builderService.hasPlayset()) {
      this.router.navigate(['']);
    }
  }

  selectedSuitEvent(suit: string): void {
    this.suit = suit;
  }

  continue(): void {
    if (this.name == ''){
      alert('You need a Name');
    } else if (this.level <= 0 || this.level > 11) {
      alert('Starting Level must be between 1 and 11');
    } else if (this.suit == '') {
      alert('You must select a Core Suit');
    } else if (this.characterConfigs == '') {
      alert('You must import character config');
    } else {
      this.builderService.setName(this.name);
      this.builderService.setCoreSuit(this.suit);
      this.builderService.setCurrentLevel(this.level);

      let characterConfigs = this.characterConfigs.split('\n').filter(str => str);
      let queryParams = this.builderService.getCharacterQueryString();
      queryParams['character'] = characterConfigs;

      this.router.navigate(['character-sheet'], { queryParams: queryParams });
    }
  }

  reset(): void {
    this.builderService.reset();
    this.router.navigate(['']);
  }

}
