import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsEditorComponent } from './editor.component';

describe('TextAreaComponent', () => {
  let component: NsEditorComponent;
  let fixture: ComponentFixture<NsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
