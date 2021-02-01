import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { NS_FACEBOOK_CONFIG_TOKEN } from "../providers/config.provider";

@Injectable({
  providedIn: 'root'
})
export class NsFacebookService
{

  private script: string = 'https://connect.facebook.net/en_US/sdk.js';

  constructor(@Inject(NS_FACEBOOK_CONFIG_TOKEN) private config: fb.InitParams) { }

  private loadScript()
  {
    const facebookId: string = `ns-facebook-${ this.config.appId }`;
    if ( !document.getElementById(facebookId) )
    {
      const script = document.createElement('script') as HTMLScriptElement;
      script.id = facebookId;
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.src = this.script;
      document.body.appendChild(script);
    }
  }

  init()
  {
    if ( this.config && this.config.appId )
    {
      this.loadScript();
      (window as any).fbAsyncInit = () =>
      {
        FB.init(this.config);
        if ( this.config.developmentMode )
        {
          console.log(`Facebook SDK for AppId - ${ this.config.appId }`)
        }
      }
    } else
    {
      throw new Error("Cannot load configuration, since it is necessary to indicate the facebook appId");
    }
  }

  get checkLoginState(): Observable<fb.StatusResponse>
  {
    const checkStatus$: Subject<fb.StatusResponse> = new Subject<fb.StatusResponse>();
    FB.getLoginStatus(response =>
    {
      checkStatus$.next(response);
      checkStatus$.complete();
    })
    return checkStatus$.asObservable();
  }


  login(scope: string)
  {
    const loginStatus$: Subject<fb.StatusResponse> = new Subject<fb.StatusResponse>();
    FB.login(response =>
    {
      loginStatus$.next(response);
      loginStatus$.complete();
    }, { scope })
    return loginStatus$.asObservable();
  }

  logout()
  {
    const logoutStatus$: Subject<fb.StatusResponse> = new Subject<fb.StatusResponse>();
    FB.logout(response =>
    {
      logoutStatus$.next(response);
      logoutStatus$.complete();
    })
    return logoutStatus$.asObservable();
  }
}
