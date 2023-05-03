import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaysetsComponent } from './playsets.component';

describe('PlaysetsComponent', () => {
  let component: PlaysetsComponent;
  let fixture: ComponentFixture<PlaysetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaysetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaysetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
