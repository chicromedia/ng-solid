import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsScheduleComponent } from './schedule.component';

describe('ScheduleComponent', () => {
  let component: NsScheduleComponent;
  let fixture: ComponentFixture<NsScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
