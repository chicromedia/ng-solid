import { Injectable } from '@angular/core';

declare type Target = '_blank' | '_parent' | '_top' | '_self' | string;

@Injectable()
export class WindowRef
{

  constructor() { }

  get nativeWindow()
  {
    return window;
  }

  navigateTo(url: string, target?: Target, features?: string[])
  {
    return this.nativeWindow.open(url, target, features.join(','));
  }
}
