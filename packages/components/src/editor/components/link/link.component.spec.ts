import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsEditorLinkComponent } from './link.component';

describe('LinkComponent', () => {
  let component: NsEditorLinkComponent;
  let fixture: ComponentFixture<NsEditorLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsEditorLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsEditorLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
