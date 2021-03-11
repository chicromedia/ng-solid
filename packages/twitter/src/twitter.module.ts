import { NgModule } from '@angular/core';
import { NsTwitterComponent } from './components/share/share.component';
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [ CommonModule ],
  declarations: [ NsTwitterComponent ],
  exports: [ NsTwitterComponent ]
})
export class NsTwitterModule
{
  constructor()
  {
  }
}
