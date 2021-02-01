import { HttpClient } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { Provider } from "@angular/core";
import { TranslateLoader } from "@ngx-translate/core";

export function createTranslateLoader(http: HttpClient)
{
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const TRANSLATE_LOADER: Provider = {
  provide: TranslateLoader,
  useFactory: createTranslateLoader,
  deps: [ HttpClient ]
}
