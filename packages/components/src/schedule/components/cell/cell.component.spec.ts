import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsScheduleCellComponent } from './cell.component';

describe('CellComponent', () => {
  let component: NsScheduleCellComponent;
  let fixture: ComponentFixture<NsScheduleCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsScheduleCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsScheduleCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
