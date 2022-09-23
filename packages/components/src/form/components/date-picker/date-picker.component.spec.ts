import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsDatePickerComponent } from './date-picker.component';

describe('DatePickerComponent', () => {
  let component: NsDatePickerComponent;
  let fixture: ComponentFixture<NsDatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsDatePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsDatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
