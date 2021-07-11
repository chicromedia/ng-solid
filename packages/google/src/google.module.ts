import { Host, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { NsGoogleService } from "./services/google.service";
import { NS_GOOGLE_CONFIG } from "./providers/google-setup.provider";
import { GoogleSetup } from "./interfaces/google-setup";
import { CommonModule } from "@angular/common";
import { GoogleAdsenseComponent } from './components/google-adsense/google-adsense.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [ GoogleAdsenseComponent ],
  exports: [ GoogleAdsenseComponent ]
})
export class NsGoogleModule
{
  constructor(@Optional() @Host() private google: NsGoogleService)
  {
  }

  static forRoot(config: Partial<GoogleSetup>): ModuleWithProviders<NsGoogleModule>
  {
    return {
      ngModule: NsGoogleModule,
      providers: [
        NsGoogleService,
        {
          provide: NS_GOOGLE_CONFIG,
          useValue: config
        }
      ]
    }
  };
}
