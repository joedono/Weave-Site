import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuilderService } from 'src/app/services/builder.service';

@Component({
  selector: 'app-creation-type',
  templateUrl: './creation-type.component.html',
  styleUrls: ['./creation-type.component.less']
})
export class CreationTypeComponent implements OnInit {

  constructor(
    private router: Router,
    private builderService: BuilderService
  ) { }

  ngOnInit(): void {
    if (!this.builderService.hasPlayset()) {
      this.router.navigate(['']);
    }
  }

}
