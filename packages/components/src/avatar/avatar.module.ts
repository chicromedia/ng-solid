import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsAvatarComponent } from './avatar.component';

@NgModule( {
    imports: [
        CommonModule
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
