import { NgModule } from '@angular/core';
import { NsSafeHtmlPipe } from "./pipes/safe-html.pipe";
import { CommonModule } from "@angular/common";
import { WindowRef } from "./services/window.service";
import { NsLinkService } from "./services/link.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NsSafeHtmlPipe
  ],
  providers: [
    WindowRef,
    NsLinkService
  ],
  exports: [
    NsSafeHtmlPipe
  ]
})
export class NsCoreModule
{
  constructor() {}
}
