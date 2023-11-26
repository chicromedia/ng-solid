import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsToastComponent } from './toast.component';
import { checkCircle, exclamationCircle, exclamationTriangle, infoCircle, NsIconsModule } from '@ng-solid/icons';
import { NsCoreModule } from '@ng-solid/core';

@NgModule( {
    imports: [
        CommonModule,
        NsIconsModule.forRoot( [ checkCircle, infoCircle, exclamationTriangle, exclamationCircle ] ),
        NsCoreModule
    ],
    declarations: [ NsToastComponent ]
} )
export class NsToastModule
{
}
