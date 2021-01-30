import { TestBed } from '@angular/core/testing';

import { NgsService } from './ngs.service';

describe('NgsService', () => {
  let service: NgsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
