import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsIconComponent } from './components/icon/icon.component';
import { NS_ICONS_PATCH, NsIconService } from "./services/icon.service";


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    NsIconComponent
  ],
  exports: [ NsIconComponent ]
})
export class NsIconModule
{
  static forRoot(setting: { path: string }): ModuleWithProviders<NsIconModule>
  {
    return {
      ngModule: NsIconModule,
      providers: [
        NsIconService,
        {
          provide: NS_ICONS_PATCH,
          useValue: setting.path
        }
      ]
    };
  }
}
