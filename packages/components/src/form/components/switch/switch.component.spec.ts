import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsSwitchComponent } from './switch.component';

describe('SwitchComponent', () => {
  let component: NsSwitchComponent;
  let fixture: ComponentFixture<NsSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NsSwitchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NsSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
