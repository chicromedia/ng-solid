import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { NS_FACEBOOK_CONFIG_TOKEN } from "../providers/config.provider";
import { filter } from "rxjs/operators";
import { NsCookieService, NsWindowService } from "@ng-solid/core";
import { fromPromise } from "rxjs/internal-compatibility";
import { Meta } from "@angular/platform-browser";
import FacebookEventCallback = fb.FacebookEventCallback;

@Injectable({
  providedIn: 'root'
})
export class NsFacebookService
{

  private readonly ready$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private readonly script: string = 'https://connect.facebook.net/en_US/sdk.js';

  constructor(@Inject(NS_FACEBOOK_CONFIG_TOKEN) private config: fb.InitParams,
              private meta: Meta,
              private windowRef: NsWindowService,
              private cookie: NsCookieService)
  {
    this.init();
  }

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

  private init()
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
      console.warn("Cannot load configuration, since it is necessary to indicate the facebook appId")
    }
  }

  get onReady(): Observable<boolean>
  {
    return this.ready$.pipe(filter(value => !!value));
  }

  get checkLoginState(): Observable<fb.StatusResponse>
  {
    return fromPromise(new Promise(
      resolve => FB.getLoginStatus(resolve)
    ))
  }

  login(scope: string)
  {
    return fromPromise(new Promise<fb.StatusResponse>((resolve, reject) =>
      FB.login(response =>
      {
        if ( response.status === 'connected' )
        {
          if ( this.config.cookie )
          {
            const [ type, domain ] = location.host.split('.').reverse();
            this.cookie.set(`fbsr_${ this.config.appId }`,
              response.authResponse.signedRequest,
              {
                domain: `.${ domain ? [ domain, type ].join('.') : type }`,
                path: location.pathname,
                expires: response.authResponse.expiresIn
              }
            );
          }
          resolve(response);
        } else
        {
          reject(response);
        }
      }, { scope })
    ))
  }

  logout()
  {
    return fromPromise(
      new Promise(resolve => FB.logout(resolve))
    )
  }

  subscribe(event: fb.FacebookEventType, callback: FacebookEventCallback<fb.FacebookEventType>)
  {
    FB.Event.subscribe(event, callback);
  }

  unsubscribe(event: fb.FacebookEventType, callback: FacebookEventCallback<fb.FacebookEventType>)
  {
    FB.Event.unsubscribe(event, callback);
  }

  share(link: string, hashtag?: string)
  {
    return fromPromise(
      new Promise<fb.ShareDialogResponse>(resolve =>
        FB.ui({
          method: "share",
          href: link,
          hashtag: hashtag ? `#${ hashtag }` : null
        }, resolve)
      )
    );
  }

  openGraph(definition: fb.OpenGraph)
  {
    Object.entries(definition).forEach(([ property, content ]) =>
    {
      const selector = `property=${ property }`;
      if ( !this.meta.getTag(selector) )
      {
        this.meta.addTag({ property, content })
      } else
      {
        this.meta.updateTag({ property, content }, selector);
      }
    })
  }
}
