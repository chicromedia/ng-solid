import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsPasswordComponent } from './password.component';

describe('PasswordComponent', () => {
  let component: NsPasswordComponent;
  let fixture: ComponentFixture<NsPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
