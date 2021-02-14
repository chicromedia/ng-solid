import { ModuleWithProviders, NgModule } from '@angular/core';
import { NsFacebookLoginComponent } from "./components/login/login.component";
import { CommonModule } from "@angular/common";
import { NsFacebookService } from "./services/facebook.service";
import { NS_FACEBOOK_CONFIG_TOKEN } from "./providers/config.provider";
import { NsFacebookShareComponent } from './components/share/share.component';
import { NsFacebookLikeComponent } from './components/like/like.component';
import { NsCoreModule } from "@ng-solid/core";


@NgModule({
  imports: [
    CommonModule,
    NsCoreModule
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

  constructor(private facebook: NsFacebookService)
  {
    this.facebook.init();
  }

  static forRoot(config: fb.InitParams): ModuleWithProviders<NsFacebookModule>
  {
    return {
      ngModule: NsFacebookModule,
      providers: [
        NsFacebookService,
        {
          provide: NS_FACEBOOK_CONFIG_TOKEN,
          useValue: <fb.InitParams>{
            cookie: false,
            xfbml: true,
            version: 'v9.0',
            developmentMode: false,
            ...config
          }
        }
      ]
    }
  };
}
