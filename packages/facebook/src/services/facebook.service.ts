import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { filter } from "rxjs/operators";
import { fromPromise } from "rxjs/internal-compatibility";
import { Meta } from "@angular/platform-browser";
import { isPlatformBrowser } from "@angular/common";
import { NS_FACEBOOK_CONFIG } from "../providers/config.provider";
import FacebookEventCallback = fb.FacebookEventCallback;

@Injectable({ providedIn: "root" })
export class NsFacebookService
{
  private readonly ready$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private readonly script: string = 'https://connect.facebook.net/en_US/sdk.js';

  constructor(@Inject(NS_FACEBOOK_CONFIG) private config: fb.InitParams,
              @Inject(PLATFORM_ID) private platformId: string,
              private meta: Meta)
  {
    this.init(this.config);
  }

  private loadScript(config: fb.InitParams)
  {
    const facebookId: string = `ns-facebook-${ config.appId }`;
    if ( !document.getElementById(facebookId) )
    {
      const script = document.createElement('script') as HTMLScriptElement;
      script.type = 'text/javascript';
      script.id = facebookId;
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.src = this.script;
      document.body.appendChild(script);

      (window as any).fbAsyncInit = () =>
      {
        FB.init(config);
      }

      script.onload = () =>
      {
        if ( config.debug )
        {
          console.info(`Loaded FB SDK for ${ config.appId }`);
        }
        this.ready$.next(true);
      }
    }
  }

  private init(config: fb.InitParams)
  {
    if ( isPlatformBrowser(this.platformId) && config && config.appId )
    {
      this.loadScript({ cookie: false, xfbml: true, version: 'v9.0', debug: false, ...config });
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
    const selector = `property='fb:app_id'`;
    this.meta.getTag(selector)
      ? this.meta.updateTag({ property: 'fb:app_id', content: this.config.appId }, selector)
      : this.meta.addTag({ property: 'fb:app_id', content: this.config.appId });

    Object.entries(definition).forEach(([ property, content ]) =>
    {
      const selector = `property='og:${ property }'`;
      const exits = this.meta.getTag(selector);
      if ( !exits && content )
      {
        this.meta.addTag({ property: `og:${ property }`, content: content });
      } else if ( exits )
      {
        this.meta.updateTag({ property: `og:${ property }`, content: content || '' }, selector)
      }
    })
  }
}
