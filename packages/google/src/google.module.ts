import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { NsGoogleService } from "./services/google.service";
import { NS_GOOGLE_CONFIG } from "./providers/google-setup.provider";
import { GoogleSetup } from "./interfaces/google-setup";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  exports: []
})
export class NsGoogleModule
{
  constructor(@Optional() @SkipSelf() private google: NsGoogleService)
  {
  }

  static forRoot(config: GoogleSetup): ModuleWithProviders<NsGoogleModule>
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
