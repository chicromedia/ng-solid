import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NsIconComponent } from "./icon.component";


describe('IconComponent', () =>
{
  let component: NsIconComponent;
  let fixture: ComponentFixture<NsIconComponent>;

  beforeEach(async () =>
  {
    await TestBed.configureTestingModule({
      declarations: [ NsIconComponent ]
    })
      .compileComponents();
  });

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(NsIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });
});
