import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsDropdownComponent } from './components/dropdown/dropdown.component';
import { NsDropdownItemDirective } from './components/directives/dropdown-item.directive';
import { NsIconModule } from "../icon/icon.module";
import { NsFormsModule } from '../form/forms.module';
import { FormsModule } from '@angular/forms';


@NgModule( {
    imports: [
        CommonModule,
        NsIconModule,
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
