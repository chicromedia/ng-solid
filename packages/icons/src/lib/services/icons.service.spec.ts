import { TestBed } from '@angular/core/testing';

import { NsIconsService } from './icons.service';

describe('IconsService', () => {
  let service: NsIconsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NsIconsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
