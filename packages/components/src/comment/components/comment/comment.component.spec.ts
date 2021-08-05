import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsCommentComponent } from './comment.component';

describe('CommentComponent', () => {
  let component: NsCommentComponent;
  let fixture: ComponentFixture<NsCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NsCommentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NsCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
