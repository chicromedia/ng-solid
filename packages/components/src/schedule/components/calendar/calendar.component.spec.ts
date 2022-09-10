import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsScheduleCalendarComponent } from './calendar.component';

describe('DateRangeComponent', () => {
  let component: NsScheduleCalendarComponent;
  let fixture: ComponentFixture<NsScheduleCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsScheduleCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsScheduleCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
