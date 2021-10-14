import { ModuleWithProviders, NgModule } from '@angular/core';
import { NsTwitterComponent } from './components/share/share.component';
import { CommonModule } from "@angular/common";
import { NsTwitterService } from "./services/twitter.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NsTwitterComponent
  ],
  exports: [
    NsTwitterComponent
  ]
})
export class NsTwitterModule
{
  constructor()
  {
  }

  static forRoot(): ModuleWithProviders<NsTwitterModule>
  {
    return {
      ngModule: NsTwitterModule,
      providers: [ NsTwitterService ]
    }
  };
}
