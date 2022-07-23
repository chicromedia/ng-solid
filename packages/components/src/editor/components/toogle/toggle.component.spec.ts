import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsEditorToggleCommandComponent } from './toggle.component';

describe('NsToggleCommandComponent', () => {
  let component: NsEditorToggleCommandComponent;
  let fixture: ComponentFixture<NsEditorToggleCommandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsEditorToggleCommandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsEditorToggleCommandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
