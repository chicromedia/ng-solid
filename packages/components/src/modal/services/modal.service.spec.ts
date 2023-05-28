import { TestBed } from '@angular/core/testing';

import { NsModalService } from './modal.service';

describe('ModalService', () => {
  let service: NsModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NsModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
