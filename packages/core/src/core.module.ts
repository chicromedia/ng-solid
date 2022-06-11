import { NgModule } from '@angular/core';
import { NsSafeHtmlPipe } from './pipes/safe-html.pipe';
import { CommonModule } from '@angular/common';
import { WindowRef } from './services/window.service';
import { NsLinkService } from './services/link.service';
import { NsHumanizePipe } from './pipes/humanize.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NsSafeHtmlPipe,
    NsHumanizePipe
  ],
  providers: [
    WindowRef,
    NsLinkService
  ],
  exports: [
    NsSafeHtmlPipe,
    NsHumanizePipe
  ]
})
export class NsCoreModule
{
  constructor() {}
}
