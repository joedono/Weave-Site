import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BuilderService } from 'src/app/services/builder.service';

@Component({
  selector: 'app-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.less']
})
export class NewCharacterComponent {

  suit: string = "";
  level: number = 1;

  constructor(
    private router: Router,
    private builderService: BuilderService
  ) { }

  selectedSuitEvent(suit: string): void {
    this.suit = suit;
  }

  continue(): void {
    this.builderService.setCurrentLevel(1);
    this.builderService.setEndLevel(this.level);
    this.builderService.setCoreSuit(this.suit);

    this.router.navigate(['card']);
  }

  reset(): void {
    this.builderService.reset();
    this.router.navigate(['']);
  }

}
