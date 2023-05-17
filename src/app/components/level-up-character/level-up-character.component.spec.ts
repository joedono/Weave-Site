import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelUpCharacterComponent } from './level-up-character.component';

describe('LevelUpCharacterComponent', () => {
  let component: LevelUpCharacterComponent;
  let fixture: ComponentFixture<LevelUpCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelUpCharacterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelUpCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
