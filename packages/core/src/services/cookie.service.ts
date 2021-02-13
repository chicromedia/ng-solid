import { Inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class NsCookieService
{

  constructor(@Inject(DOCUMENT) private document: any,
              @Inject(PLATFORM_ID) private platformId: InjectionToken<object>)
  { }

  set(name: string, value: string, options: { expires?: number | Date; path?: string; domain?: string; secure?: boolean; sameSite?: 'Lax' | 'None' | 'Strict' } = {}): void
  {
    if ( !isPlatformBrowser(this.platformId) )
    {
      return;
    }

    let cookieString: string = `${ encodeURIComponent(name) }=${ encodeURIComponent(value) };`;
    if ( options.expires )
    {
      if ( typeof options.expires === 'number' )
      {
        const dateExpires: Date = new Date(new Date().getTime() + options.expires * 1000);
        cookieString += `expires=${ dateExpires.toUTCString() };`;
      } else
      {
        cookieString += `expires=${ options.expires.toUTCString() };`;
      }
    }

    if ( options.path )
    {
      cookieString += `path=${ options.path };`;
    }

    if ( options.domain )
    {
      cookieString += `domain=${ options.domain };`;
    }

    options.secure = options.secure || location.protocol === 'https:';
    if ( options.secure === false && options.sameSite === 'None' )
    {
      options.secure = true;
      console.warn(
        `[ns-solid] Cookie ${ name } was forced with secure flag because sameSite=None.`
      );
    }
    if ( options.secure )
    {
      cookieString += 'secure;';
    }

    cookieString += `sameSite=${ options.sameSite || 'Lax' };`;
    this.document.cookie = cookieString;
  }
}
