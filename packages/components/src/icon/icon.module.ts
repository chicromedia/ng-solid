import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsIconComponent } from './components/icon/icon.component';
import { NS_ICONS_SETUP, NsIconService } from "./services/icon.service";
import { IconSetup } from "./interfaces/icon-setup";


@NgModule({
  imports: [ CommonModule ],
  declarations: [ NsIconComponent ],
  exports: [ NsIconComponent ]
})
export class NsIconModule
{
  static forRoot(setting: IconSetup): ModuleWithProviders<NsIconModule>
  {
    return {
      ngModule: NsIconModule,
      providers: [
        NsIconService,
        {
          provide: NS_ICONS_SETUP,
          useValue: setting
        }
      ]
    };
  }
}
