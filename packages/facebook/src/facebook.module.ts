import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { NsFacebookLoginComponent } from "./components/login/login.component";
import { CommonModule } from "@angular/common";
import { NsFacebookService } from "./services/facebook.service";
import { NS_FACEBOOK_CONFIG } from "./providers/config.provider";
import { NsFacebookShareComponent } from './components/share/share.component';
import { NsFacebookLikeComponent } from './components/like/like.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NsFacebookLoginComponent,
    NsFacebookShareComponent,
    NsFacebookLikeComponent
  ],
  exports: [
    NsFacebookLoginComponent,
    NsFacebookLikeComponent,
    NsFacebookShareComponent,
  ]
})
export class NsFacebookModule
{

  constructor(@Optional() @SkipSelf() private facebook: NsFacebookService)
  {
  }

  static forRoot(config: fb.InitParams): ModuleWithProviders<NsFacebookModule>
  {
    return {
      ngModule: NsFacebookModule,
      providers: [
        NsFacebookService,
        {
          provide: NS_FACEBOOK_CONFIG,
          useValue: config
        }
      ]
    }
  };
}
