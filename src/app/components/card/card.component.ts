import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BuilderService } from 'src/app/services/builder.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.less']
})
export class CardComponent implements OnInit {

  cards: string[] = [];
  selectedCard: string = '';
  level: number = 0;

  constructor(
    private router: Router,
    private builderService: BuilderService
  ) { }

  ngOnInit(): void {
    this.cards = this.builderService.getCards();
    this.level = this.builderService.getCurrentLevel();
  }

  selectCard(card: string): void {
    this.selectedCard = card;
  }

  private selectRandomCard(): string {
    return this.cards[Math.floor(Math.random() * this.cards.length)];
  }

  continue(): void {
    let card: string = this.selectedCard;
    if (card == 'Random') {
      card = this.selectRandomCard();
    }

    this.builderService.setCurrentCard(card);
    this.router.navigate(['quality']);
  }

  reset(): void {
    this.builderService.reset();
    this.router.navigate(['']);
  }

}
