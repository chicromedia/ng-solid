import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsScheduleEventComponent } from './event.component';

describe('EventComponent', () => {
  let component: NsScheduleEventComponent;
  let fixture: ComponentFixture<NsScheduleEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsScheduleEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsScheduleEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
