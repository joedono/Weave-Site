import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BuilderService } from 'src/app/services/builder.service';

@Component({
  selector: 'app-new-character',
  templateUrl: './new-character.component.html',
  styleUrls: ['./new-character.component.less']
})
export class NewCharacterComponent {

  constructor(
    private router: Router,
    private builderService: BuilderService
  ) { }

  startNewCharacter(): void {
    
  }

  reset(): void {

  }

}
