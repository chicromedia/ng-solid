import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsModalWindow } from './modal.component';

describe('ModalComponent', () => {
  let component: NsModalWindow;
  let fixture: ComponentFixture<NsModalWindow>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsModalWindow ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsModalWindow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
