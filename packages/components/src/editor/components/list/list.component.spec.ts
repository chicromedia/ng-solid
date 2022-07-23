import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsEditorListComponent } from './list.component';

describe('ListComponent', () => {
  let component: NsEditorListComponent;
  let fixture: ComponentFixture<NsEditorListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsEditorListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsEditorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
