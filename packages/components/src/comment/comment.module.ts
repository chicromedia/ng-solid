import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsCommentComponent } from './components/comment/comment.component';
import { NsCoreModule } from "@ng-solid/core";
import { NsAvatarModule } from "../avatar/avatar.module";


@NgModule({
  imports: [
    CommonModule,
    NsAvatarModule,
    NsCoreModule
  ],
  declarations: [
    NsCommentComponent
  ],
  exports: [
    NsCommentComponent
  ]
})
export class NsCommentModule
{
}
