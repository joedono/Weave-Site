import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationTypeComponent } from './creation-type.component';

describe('CreationTypeComponent', () => {
  let component: CreationTypeComponent;
  let fixture: ComponentFixture<CreationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
