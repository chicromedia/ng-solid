import { NgModule } from '@angular/core';
import { WindowRef } from "./services/window.service";
import { NsLinkService } from "./services/link.service";

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    WindowRef,
    NsLinkService
  ],
  exports: []
})
export class NsCoreModule
{
}
