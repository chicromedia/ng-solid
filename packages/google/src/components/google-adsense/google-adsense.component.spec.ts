import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleAdsenseComponent } from './google-adsense.component';

describe('GoogleAdsenseComponent', () => {
  let component: GoogleAdsenseComponent;
  let fixture: ComponentFixture<GoogleAdsenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleAdsenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAdsenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
