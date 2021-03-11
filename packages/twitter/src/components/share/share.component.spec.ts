import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsTwitterComponent } from './share.component';

describe('TwitterComponent', () => {
  let component: NsTwitterComponent;
  let fixture: ComponentFixture<NsTwitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsTwitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsTwitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
