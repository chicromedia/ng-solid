import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsFacebookLikeComponent } from './like.component';

describe('LikeComponent', () => {
  let component: NsFacebookLikeComponent;
  let fixture: ComponentFixture<NsFacebookLikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsFacebookLikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsFacebookLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
