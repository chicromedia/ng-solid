import { TestBed } from '@angular/core/testing';

import { NsScheduleService } from './schedule.service';

describe('ScheduleService', () => {
  let service: NsScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NsScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
