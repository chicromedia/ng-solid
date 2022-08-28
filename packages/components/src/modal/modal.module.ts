import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsModalWindow } from './modal.component';
import { NsModalFooter } from './directives/modal.directive';


@NgModule( {
    imports: [ CommonModule ],
    declarations: [
        NsModalWindow,
        NsModalFooter
    ],
    exports: [
        NsModalFooter
    ],
    entryComponents: [
        NsModalWindow
    ]
} )
export class NsModalModule
{
}
