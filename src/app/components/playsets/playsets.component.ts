import { Component, OnInit } from '@angular/core';
import { PlaysetMetaModel } from 'src/app/models/playset-meta.model';
import { PlaysetsService } from 'src/app/services/playsets.service';

@Component({
  selector: 'app-playsets',
  templateUrl: './playsets.component.html',
  styleUrls: ['./playsets.component.less']
})
export class PlaysetsComponent implements OnInit {

  playsets: PlaysetMetaModel[] = [];
  selectedPlayset: PlaysetMetaModel | undefined;

  constructor(private playsetsService: PlaysetsService) { }

  ngOnInit(): void {
    this.playsetsService.getPlaysets()
      .subscribe(playsets => this.playsets = playsets);
  }

  onPlaysetSelect(playset: PlaysetMetaModel) {
    this.selectedPlayset = playset;
    console.log(this.selectedPlayset);
  }

}
