import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistingCharacterComponent } from './existing-character.component';

describe('ExistingCharacterComponent', () => {
  let component: ExistingCharacterComponent;
  let fixture: ComponentFixture<ExistingCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExistingCharacterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExistingCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
