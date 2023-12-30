import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsAvatarComponent } from './avatar.component';
import { NsIconsModule } from '@ng-solid/icons';

@NgModule( {
    imports: [
        CommonModule,
        NsIconsModule
    ],
    declarations: [
        NsAvatarComponent
    ],
    exports: [
        NsAvatarComponent
    ]
} )
export class NsAvatarModule
{
}
