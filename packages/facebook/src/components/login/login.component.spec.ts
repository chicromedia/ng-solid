import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NsFacebookLoginComponent } from './login.component';

describe('LoginComponent', () =>
{
  let component: NsFacebookLoginComponent;
  let fixture: ComponentFixture<NsFacebookLoginComponent>;

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      declarations: [ NsFacebookLoginComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(NsFacebookLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () =>
  {
    expect(component).toBeTruthy();
  });
});
