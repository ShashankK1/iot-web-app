import { TestBed } from '@angular/core/testing';

import { DataTravelService } from './data-travel.service';

describe('DataTravelService', () => {
  let service: DataTravelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataTravelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
