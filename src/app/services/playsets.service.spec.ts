import { TestBed } from '@angular/core/testing';

import { PlaysetsService } from './playsets.service';

describe('PlaysetsService', () => {
  let service: PlaysetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaysetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
