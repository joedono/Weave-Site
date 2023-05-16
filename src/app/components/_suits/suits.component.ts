import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-suits',
  templateUrl: './suits.component.html',
  styleUrls: ['./suits.component.less']
})
export class SuitsComponent {

  @Output() selectedSuitEvent = new EventEmitter<string>();
  selectedSuit: string;

  constructor() {
    this.selectedSuit = "";
  }

  onSuitSelect(suit: string): void {
    this.selectedSuit = suit;
    this.selectedSuitEvent.emit(suit);
  }

}
