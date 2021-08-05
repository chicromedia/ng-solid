import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsAvatarComponent } from './components/avatar/avatar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NsAvatarComponent
  ],
  exports: [
    NsAvatarComponent
  ]
})
export class NsAvatarModule
{
}
