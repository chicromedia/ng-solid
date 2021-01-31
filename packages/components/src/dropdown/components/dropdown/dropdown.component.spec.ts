import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsDropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: NsDropdownComponent;
  let fixture: ComponentFixture<NsDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
