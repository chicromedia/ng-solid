import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsFacebookShareComponent } from './share.component';

describe('ShareComponent', () => {
  let component: NsFacebookShareComponent;
  let fixture: ComponentFixture<NsFacebookShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsFacebookShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsFacebookShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
