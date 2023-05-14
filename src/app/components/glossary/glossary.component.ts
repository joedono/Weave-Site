import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaysetsService } from 'src/app/services/playsets.service';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.less']
})
export class GlossaryComponent implements OnInit {

  playsetId: string = '';
  playsetPath: string = '';

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.playsetId = params['playset'];
      this.playsetPath = './assets/' + this.playsetId + '/' + this.playsetId + '.md';
    });
  }

}
