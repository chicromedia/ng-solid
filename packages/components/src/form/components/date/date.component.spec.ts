import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsDateComponent } from './date.component';

describe('DateComponent', () => {
  let component: NsDateComponent;
  let fixture: ComponentFixture<NsDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
