import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.less']
})
export class ButtonsComponent {
  @Output() chooseEvent = new EventEmitter();
  @Output() resetEvent = new EventEmitter();

  choose() {
    this.chooseEvent.emit();
  }

  reset() {
    this.resetEvent.emit();
  }

}
