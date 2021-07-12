import { TestBed } from '@angular/core/testing';

import { NsLinkService } from './link.service';

describe('LinkService', () => {
  let service: NsLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NsLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
