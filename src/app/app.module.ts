import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from "../environments/environment";
import { NsFacebookModule } from "@ng-solid/facebook";
import { TranslateModule } from "@ngx-translate/core";
import { TRANSLATE_LOADER } from "./providers/translate";
import { HttpClientModule } from "@angular/common/http";
import { NsTwitterModule } from "@ng-solid/twitter";
import { NsGoogleModule } from "../../packages/google/src/google.module";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    NsFacebookModule.forRoot({
      appId: '1389249668088014',
      debug: !environment.production
    }),
    NsGoogleModule.forRoot({
      analyticsId: 'G-2HK22MX8LY'
    }),
    NsTwitterModule,
    TranslateModule.forRoot({
      loader: TRANSLATE_LOADER,
      useDefaultLang: true,
      defaultLanguage: 'es_ES'
    })
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule
{
}
