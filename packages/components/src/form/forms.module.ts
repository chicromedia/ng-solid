import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NsInputComponent } from './components/input/input.component';
import { NsDateComponent } from './components/date/date.component';
import { NsTextAreaComponent } from './components/text-area/text-area.component';
import { NsCheckboxComponent } from './components/checkbox/checkbox.component';
import { NsPasswordComponent } from './components/password/password.component';
import { NsFormContentEditableDirective } from './directives/form-content-editable.directive';
import { RouterModule } from "@angular/router";
import { NsSwitchComponent } from './components/switch/switch.component';
import { NsIconModule } from "../icon/icon.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NsIconModule
  ],
  declarations: [
    NsInputComponent,
    NsDateComponent,
    NsTextAreaComponent,
    NsCheckboxComponent,
    NsPasswordComponent,
    NsFormContentEditableDirective,
    NsSwitchComponent
  ],
  exports: [
    NsInputComponent,
    NsDateComponent,
    NsTextAreaComponent,
    NsCheckboxComponent,
    NsPasswordComponent,
    NsFormContentEditableDirective
  ]
})
export class NsFormsModule
{
}
