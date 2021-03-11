import { NgModule } from '@angular/core';
import { NsCookieService } from "./services/cookie.service";
import { NsWindowService } from "./services/window.service";
import { WINDOW_PROVIDER } from "./providers/window.provider";

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    NsCookieService,
    NsWindowService,
    WINDOW_PROVIDER
  ],
  exports: []
})
export class NsCoreModule
{
}
