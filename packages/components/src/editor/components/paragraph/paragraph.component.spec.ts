import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsEditorParagraphComponent } from './paragraph.component';

describe('ParagraphComponent', () => {
  let component: NsEditorParagraphComponent;
  let fixture: ComponentFixture<NsEditorParagraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsEditorParagraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsEditorParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
