import { TestBed } from '@angular/core/testing';

import { NsModal } from './modal.service';

describe('ModalService', () => {
  let service: NsModal;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NsModal);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
