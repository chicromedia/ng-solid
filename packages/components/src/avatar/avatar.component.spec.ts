import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsAvatarComponent } from './avatar.component';

describe('AvatarComponent', () => {
  let component: NsAvatarComponent;
  let fixture: ComponentFixture<NsAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NsAvatarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NsAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
