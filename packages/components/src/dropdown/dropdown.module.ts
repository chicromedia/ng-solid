import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsDropdownComponent } from './dropdown.component';
import { NsDropdownItemDirective } from './directives/dropdown-item.directive';
import { NsIconsModule } from '@ng-solid/icons';
import { FormsModule } from '@angular/forms';


@NgModule( {
    imports: [
        CommonModule,
        NsIconsModule,
        FormsModule
    ],
    declarations: [
        NsDropdownComponent,
        NsDropdownItemDirective
    ],
    exports: [
        NsDropdownComponent,
        NsDropdownItemDirective
    ]
} )
export class NsDropdownModule
{
}
