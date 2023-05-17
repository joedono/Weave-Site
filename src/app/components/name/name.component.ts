import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuilderService } from 'src/app/services/builder.service';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.less']
})
export class NameComponent implements OnInit {

  name: string = '';

  constructor(
    private router: Router,
    private builderService: BuilderService
  ) { }

  ngOnInit(): void {
    if (!this.builderService.hasPlayset()) {
      this.router.navigate(['']);
    }
  }

  continue(): void {
    if (this.name == ''){
      alert('You need a Name');
    } else {
      this.builderService.setName(this.name);
      let queryParams = this.builderService.getCharacterQueryString();
      this.router.navigate(['character-sheet'], { queryParams: queryParams });
    }
  }

  reset(): void {
    this.builderService.reset();
    this.router.navigate(['']);
  }

}
