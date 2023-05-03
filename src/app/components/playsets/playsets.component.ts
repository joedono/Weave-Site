import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlaysetMetaModel } from 'src/app/models/playset-meta.model';
import { BuilderService } from 'src/app/services/builder.service';
import { PlaysetsService } from 'src/app/services/playsets.service';

@Component({
  selector: 'app-playsets',
  templateUrl: './playsets.component.html',
  styleUrls: ['./playsets.component.less']
})
export class PlaysetsComponent implements OnInit {

  playsets: PlaysetMetaModel[] = [];
  selectedPlayset: PlaysetMetaModel | undefined;

  constructor(
    private router: Router,
    private playsetsService: PlaysetsService,
    private builderService: BuilderService
  ) { }

  ngOnInit(): void {
    this.playsetsService.getPlaysets()
      .subscribe(playsets => this.playsets = playsets);
  }

  onPlaysetSelect(playset: PlaysetMetaModel) {
    this.selectedPlayset = playset;
  }

  choosePlayset() {
    if(this.selectedPlayset) {
      this.builderService.setPlayset(this.selectedPlayset)
        .subscribe(_ => this.router.navigate(['creation']));
    } else {
      alert('You must choose a Playset');
    }
  }

  reset() {
    this.selectedPlayset = undefined;
  }

}
