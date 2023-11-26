import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NsToastComponent } from './toast.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ToastComponent', () => {
  let component: NsToastComponent;
  let fixture: ComponentFixture<NsToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      declarations: [NsToastComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NsToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
