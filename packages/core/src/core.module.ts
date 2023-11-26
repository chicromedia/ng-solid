import { NgModule } from '@angular/core';
import { NsSafeHtmlPipe } from './pipes/safe-html.pipe';
import { CommonModule } from '@angular/common';
import { WindowRef } from './services/window.service';
import { NsLinkService } from './services/link.service';
import { NsHumanizePipe } from './pipes/humanize.pipe';
import { NsFormatDatePipe } from './pipes/format-date.pipe';

@NgModule( {
    imports: [
        CommonModule
    ],
    declarations: [
        NsSafeHtmlPipe,
        NsHumanizePipe,
        NsFormatDatePipe
    ],
    providers: [
        WindowRef,
        NsLinkService
    ],
    exports: [
        NsSafeHtmlPipe,
        NsHumanizePipe,
        NsFormatDatePipe
    ]
} )
export class NsCoreModule
{
}
