import { NgModule } from '@angular/core';
import { BROWSER_GLOBAL_PROVIDERS } from "./providers/global.provider";

@NgModule({
  imports: [],
  declarations: [],
  providers: [
    ...BROWSER_GLOBAL_PROVIDERS
  ],
  exports: []
})
export class NsCoreModule
{
}
