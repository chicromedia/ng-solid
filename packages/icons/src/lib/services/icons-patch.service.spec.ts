import { TestBed } from '@angular/core/testing';

import { NsIconsPatchService } from './icons-patch.service';

describe('IconsPatchService', () => {
  let service: NsIconsPatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NsIconsPatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
