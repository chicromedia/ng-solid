import { TestBed } from '@angular/core/testing';
import { NsToastService } from './toast.service';

describe('ToastService', () => {
  let service: NsToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: []
    });
    service = TestBed.inject(NsToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
