import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-glossary',
  templateUrl: './glossary.component.html',
  styleUrls: ['./glossary.component.less']
})
export class GlossaryComponent implements OnInit {

  playsetId: string = '';
  glossaryPath: string = '';

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.playsetId = params['playset'];
      this.glossaryPath = './assets/' + this.playsetId + '/' + this.playsetId + '.md';
    });
  }

}
