import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsButtonGroupComponent } from './components/button-group/button-group.component';
import { NsButtonComponent } from "./components/button/button.component";
import { NsIconModule } from '../icon/icon.module';


@NgModule({
    imports: [
        CommonModule,
        NsIconModule
    ],
  declarations: [
    NsButtonComponent,
    NsButtonGroupComponent
  ],
  exports: [
    NsButtonComponent,
    NsButtonGroupComponent
  ]
})
export class NsButtonModule
{
}
