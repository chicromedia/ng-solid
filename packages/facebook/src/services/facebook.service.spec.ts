import { TestBed } from '@angular/core/testing';
import { NsFacebookService } from './facebook.service';

describe('FacebookService', () =>
{
  let service: NsFacebookService;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NsFacebookService);
  });

  it('should be created', () =>
  {
    expect(service).toBeTruthy();
  });
});
