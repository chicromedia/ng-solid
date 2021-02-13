import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { NS_FACEBOOK_CONFIG_TOKEN } from "../providers/config.provider";
import { filter } from "rxjs/operators";
import { NsCookieService } from "@ng-solid/core";
import FacebookEventCallback = fb.FacebookEventCallback;

@Injectable({
  providedIn: 'root'
})
export class NsFacebookService
{

  private readonly ready$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private readonly script: string = 'https://connect.facebook.net/en_US/sdk.js';

  constructor(@Inject(NS_FACEBOOK_CONFIG_TOKEN) private config: fb.InitParams,
              private cookie: NsCookieService)
  { }

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
      this.ready$.next(true);
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

  get onReady(): Observable<boolean>
  {
    return this.ready$.pipe(filter(value => !!value));
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
      if ( this.config.cookie && response.status === 'connected' )
      {
        const [ type, domain ] = location.host.split('.').reverse();
        this.cookie.set(
          `fbsr_${ this.config.appId }`,
          response.authResponse.signedRequest,
          {
            domain: `.${ [ domain, type ].join('.') }`,
            path: location.pathname,
            expires: response.authResponse.expiresIn
          }
        );
      }
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

  subscribe(event: fb.FacebookEventType, callback: FacebookEventCallback<fb.FacebookEventType>)
  {
    FB.Event.subscribe(event, callback);
  }

  unsubscribe(event: fb.FacebookEventType, callback: FacebookEventCallback<fb.FacebookEventType>)
  {
    FB.Event.unsubscribe(event, callback);
  }
}
