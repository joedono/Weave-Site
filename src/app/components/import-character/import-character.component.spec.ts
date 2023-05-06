import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportCharacterComponent } from './import-character.component';

describe('ImportCharacterComponent', () => {
  let component: ImportCharacterComponent;
  let fixture: ComponentFixture<ImportCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportCharacterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
