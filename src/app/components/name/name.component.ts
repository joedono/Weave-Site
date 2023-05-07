import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BuilderService } from 'src/app/services/builder.service';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.less']
})
export class NameComponent {

  name: string = '';

  constructor(
    private router: Router,
    private builderService: BuilderService
  ) { }

  continue(): void {
    this.builderService.setName(this.name);
    let queryParams = this.builderService.getCharacterQueryString();

    this.router.navigate(['character-sheet'], { queryParams: queryParams });
  }

  reset(): void {
    this.builderService.reset();
    this.router.navigate(['']);
  }

}
