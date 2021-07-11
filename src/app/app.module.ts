import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from "../environments/environment";
import { NsFacebookModule } from "@ng-solid/facebook";
import { TranslateModule } from "@ngx-translate/core";
import { TRANSLATE_LOADER } from "./providers/translate";
import { HttpClientModule } from "@angular/common/http";
import { NsTwitterModule } from "@ng-solid/twitter";
import { GoogleAdFormat, NsGoogleModule } from "@ng-solid/google";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    NsFacebookModule.forRoot({
      appId: '1389249668088014',
      debug: !environment.production
    }),
    NsGoogleModule.forRoot({
      analyticsId: 'G-2HK22MX8LY',
      adClient: "ca-pub-2914026827620139",
      adSlot: 2858574739,
      adClassName: 'mb-1',
      adEnabled: environment.production,
      adFormat: GoogleAdFormat.rectangle
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
