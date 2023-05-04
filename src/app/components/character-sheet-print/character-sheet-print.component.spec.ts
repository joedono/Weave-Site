import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSheetPrintComponent } from './character-sheet-print.component';

describe('CharacterSheetPrintComponent', () => {
  let component: CharacterSheetPrintComponent;
  let fixture: ComponentFixture<CharacterSheetPrintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterSheetPrintComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterSheetPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
