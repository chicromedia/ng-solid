import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsDropdownComponent } from './components/dropdown/dropdown.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NsDropdownComponent
  ],
  exports: [
    NsDropdownComponent
  ]
})
export class NsDropdownModule
{
}
