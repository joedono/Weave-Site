import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BuilderService } from 'src/app/services/builder.service';

@Component({
  selector: 'app-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.less']
})
export class NewCharacterComponent {

  suit: string = '';
  level: number = 1;

  constructor(
    private router: Router,
    private builderService: BuilderService
  ) { }

  selectedSuitEvent(suit: string): void {
    this.suit = suit;
  }

  continue(): void {
    if (this.suit == '') {
      alert('You must select a Core Suit');
    } else if (this.level <= 0 || this.level > 10) {
      alert('Starting Level must be between 1 and 10');
    } else {
      this.builderService.setCurrentLevel(1);
      this.builderService.setEndLevel(this.level);
      this.builderService.setCoreSuit(this.suit);
      this.router.navigate(['card']);
    }
  }

  reset(): void {
    this.builderService.reset();
    this.router.navigate(['']);
  }

}
