import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsEditorColorPickerComponent } from './color-picker.component';

describe('ColorPickerComponent', () => {
  let component: NsEditorColorPickerComponent;
  let fixture: ComponentFixture<NsEditorColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsEditorColorPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsEditorColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
