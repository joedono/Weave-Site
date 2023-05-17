import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BuilderService } from 'src/app/services/builder.service';

@Component({
  selector: 'app-level-up-character',
  templateUrl: './level-up-character.component.html',
  styleUrls: ['./level-up-character.component.less']
})
export class LevelUpCharacterComponent {

  currentLevel: number = 1;
  desiredLevel: number = 10;
  suit: string = '';
  characterConfigs: string = '';

  constructor(
    private router: Router,
    private builderService: BuilderService
  ) { }

  selectedSuitEvent(suit: string): void {
    this.suit = suit;
  }

  continue(): void {
    if (this.currentLevel <= 0 || this.currentLevel > 11) {
      alert('Current Level must be between 1 and 11');
    } else if (this.desiredLevel <= 0 || this.desiredLevel > 11) {
      alert('Desired Level must be between 1 and 11');
    } else if (this.currentLevel >= this.desiredLevel) {
      alert('Desired Level must be greater than Current Level');
    } else if (this.suit == '') {
      alert('You must select a Core Suit');
    } else if (this.characterConfigs == '') {
      alert('You must import character config');
    } else {
      this.builderService.setCurrentLevel(this.currentLevel);
      this.builderService.setEndLevel(this.desiredLevel);
      this.builderService.setCoreSuit(this.suit);

      let characterConfigs = this.characterConfigs.split('\n').filter(str => str);
      this.builderService.addQualities(characterConfigs);

      this.router.navigate(['card']);
    }
  }

  reset(): void {
    this.builderService.reset();
    this.router.navigate(['']);
  }

}
