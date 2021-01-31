import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsInputComponent } from './input.component';

describe('InputComponent', () => {
  let component: NsInputComponent;
  let fixture: ComponentFixture<NsInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
