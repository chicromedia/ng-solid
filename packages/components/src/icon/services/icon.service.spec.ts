import { TestBed } from '@angular/core/testing';

import { NsIconService } from './icon.service';

describe('IconService', () => {
  let service: NsIconService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NsIconService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
