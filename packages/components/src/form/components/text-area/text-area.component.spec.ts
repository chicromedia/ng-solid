import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsTextAreaComponent } from './text-area.component';

describe('TextAreaComponent', () => {
  let component: NsTextAreaComponent;
  let fixture: ComponentFixture<NsTextAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsTextAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsTextAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
