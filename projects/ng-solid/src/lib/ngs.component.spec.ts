import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgsComponent } from './ngs.component';

describe('NgsComponent', () => {
  let component: NgsComponent;
  let fixture: ComponentFixture<NgsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
