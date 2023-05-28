import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsImageUploadComponent } from './image-upload.component';

describe('ImageUploadComponent', () => {
  let component: NsImageUploadComponent;
  let fixture: ComponentFixture<NsImageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsImageUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsImageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
