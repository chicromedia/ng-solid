import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NsInputComponent } from './components/input/input.component';
import { NsDateComponent } from './components/date/date.component';
import { NsCheckboxComponent } from './components/checkbox/checkbox.component';
import { NsPasswordComponent } from './components/password/password.component';
import { NsContentEditableComponent } from './components/content-editable/content-editable.directive';
import { RouterModule } from '@angular/router';
import { NsSwitchComponent } from './components/switch/switch.component';
import { NsIconsModule } from '@ng-solid/icons';
import { NsInputGroupComponent } from './components/input-group/input-group.component';
import { NsButtonModule } from '../button/button.module';
import { NsTextAreaComponent } from './components/text-area/text-area.component';
import { NsDatePickerComponent } from './components/date-picker/date-picker.component';
import { MaskDirective } from './directives/mask.directive';
import { NsDropdownModule } from '../dropdown/dropdown.module';
import { NsCoreModule } from '@ng-solid/core';


@NgModule( {
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NsCoreModule,
        NsIconsModule,
        NsButtonModule,
        NsDropdownModule
    ],
    declarations: [
        NsInputComponent,
        NsDateComponent,
        NsCheckboxComponent,
        NsPasswordComponent,
        NsContentEditableComponent,
        NsSwitchComponent,
        NsInputGroupComponent,
        NsTextAreaComponent,
        NsDatePickerComponent,
        MaskDirective
    ],
    exports: [
        NsInputComponent,
        NsDateComponent,
        NsCheckboxComponent,
        NsPasswordComponent,
        NsContentEditableComponent,
        NsSwitchComponent,
        NsInputGroupComponent,
        NsTextAreaComponent,
        NsDatePickerComponent
    ]
} )
export class NsFormsModule
{
}
