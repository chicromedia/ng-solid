import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsButtonGroupComponent } from './components/button-group/button-group.component';
import { NsButtonComponent } from './components/button/button.component';
import { NsIconsModule } from '@ng-solid/icons';


@NgModule( {
    imports: [
        CommonModule,
        NsIconsModule
    ],
    declarations: [
        NsButtonComponent,
        NsButtonGroupComponent,
    ],
    exports: [
        NsButtonComponent,
        NsButtonGroupComponent
    ]
} )
export class NsButtonModule
{
}
