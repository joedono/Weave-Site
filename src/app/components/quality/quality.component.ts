import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QualityModel } from 'src/app/models/quality.model';
import { BuilderService } from 'src/app/services/builder.service';

@Component({
  selector: 'app-quality',
  templateUrl: './quality.component.html',
  styleUrls: ['./quality.component.less']
})
export class QualityComponent implements OnInit {

  currentCard: string = '';
  currentLevel: number = 0;
  currentQualityType: string = '';
  title: string = '';
  qualities: QualityModel[] = [];
  selectedQuality!: QualityModel;

  constructor(
    private router: Router,
    private builderService: BuilderService
  ) { }

  ngOnInit(): void {
    this.currentCard = this.builderService.getCurrentCard();
    this.currentLevel = this.builderService.getCurrentLevel();
    this.currentQualityType = this.builderService.getCurrentQualityType();
    this.title = 'Pick a ' + this.currentQualityType;
    this.qualities = this.builderService.getCurrentQualities();
  }

  selectQuality(quality: QualityModel): void {
    this.selectedQuality = quality;
  }

  continue(): void {
    if (this.selectedQuality) {
      this.builderService.addQuality(this.selectedQuality);
      let next = this.builderService.getNextCardQualityRoute();
      this.router.navigate([next]);
    } else {
      alert('You must select a Quality');
    }
  }

  reset(): void {
    this.builderService.reset();
    this.router.navigate(['']);
  }

}
