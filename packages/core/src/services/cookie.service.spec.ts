import { TestBed } from '@angular/core/testing';
import { NsCookieService } from './cookie.service';

describe('NsCookieService', () =>
{
  let service: NsCookieService;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NsCookieService);
  });

  it('should be created', () =>
  {
    expect(service).toBeTruthy();
  });
});
