import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsWorkweekComponent } from './workweek.component';

describe('WorkweekComponent', () => {
  let component: NsWorkweekComponent;
  let fixture: ComponentFixture<NsWorkweekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsWorkweekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsWorkweekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
