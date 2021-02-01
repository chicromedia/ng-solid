import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from "../environments/environment";
import { NsFacebookModule } from "@ng-solid/facebook";
import { TranslateModule } from "@ngx-translate/core";
import { TRANSLATE_LOADER } from "./providers/translate";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    NsFacebookModule.forRoot({
      appId: '703932639721384',
      developmentMode: !environment.production
    }),
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
