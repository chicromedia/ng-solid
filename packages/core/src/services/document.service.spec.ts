import { TestBed } from '@angular/core/testing';

import { DocumentRef } from './document.service';

describe('DocumentService', () => {
  let service: DocumentRef;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentRef);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
