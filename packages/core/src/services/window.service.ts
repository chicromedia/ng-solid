import { Inject, Injectable } from '@angular/core';
import { WINDOW } from "../providers/window.provider";

declare type Target = '_blank' | '_parent' | '_top' | '_self' | string;

@Injectable({
  providedIn: 'root'
})
export class NsWindowService
{

  constructor(@Inject(WINDOW) private window: any) { }

  navigateTo(url: string, target?: Target, features?: string[])
  {
    return this.window.open(url, target, features.join(','));
  }
}
