import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsCheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: NsCheckboxComponent;
  let fixture: ComponentFixture<NsCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
