import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { GoogleEvent, GoogleItem } from "../interfaces/google-event";
import { GoogleTags } from "../enums/google-tags.enum";
import { NS_GOOGLE_CONFIG } from "../providers/google-setup.provider";
import { GoogleSetup } from "../interfaces/google-setup";
import { isPlatformBrowser } from "@angular/common";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs/operators";
import { Title } from "@angular/platform-browser";

declare const dataLayer: any[];

@Injectable()
export class NsGoogleService
{
  private readonly GOOGLE_ANALYTICS_ID: string = 'ns-google-analytics';
  private readonly GOOGLE_ADSENSE_ID: string = 'ns-google-adsense';

  private readonly analytics: string = 'https://www.googletagmanager.com/gtag/js';
  private readonly adsense: string = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';


  constructor(@Inject(NS_GOOGLE_CONFIG) private config: GoogleSetup,
              @Inject(PLATFORM_ID) private platformId: string,
              @Optional() private router: Router,
              private title: Title)
  {
    this.init(this.config);
  }

  validTagIds(id: string)
  {
    return /^(G|AW|UA|GTM)-(\w+|\w+-\w+)$/i.test(id);
  }

  validAdClient(id: string)
  {
    return /^ca-pub-(\d+)$/i.test(id);
  }

  addTag(command: 'config' | 'get' | 'set' | 'event' | "send" | string, ...params: any[])
  {
    dataLayer.push(arguments);
  }

  sendEvent(name: string, params: Partial<GoogleEvent>)
  {
    this.addTag("event", name, params);
  }

  init(config: GoogleSetup): boolean
  {
    Object.assign(this.config, <GoogleSetup>{
      display: 'block',
      adFormat: 'auto',
      currency: 'USD',
      trackingPages: true,
      enabled: true,
      adResponsive: true,
      ...this.config
    });

    (window as any).dataLayer = (window as any).dataLayer || [];
    const canTracking = config && config.adEnabled && isPlatformBrowser(this.platformId) && this.validTagIds(config.analyticsId);
    if ( canTracking && !document.getElementById(this.GOOGLE_ANALYTICS_ID) )
    {
      this.addTag('js', new Date());
      const script = document.createElement('script') as HTMLScriptElement;
      script.id = this.GOOGLE_ANALYTICS_ID;
      script.async = true;
      script.src = `${ this.analytics }?id=${ config.analyticsId }`;
      document.head.appendChild(script);
    }

    const canAdSense = config && config.adEnabled && isPlatformBrowser(this.platformId) && this.validAdClient(config.adClient);
    if ( canAdSense && !document.getElementById(this.GOOGLE_ADSENSE_ID) )
    {
      const script = document.createElement('script') as HTMLScriptElement;
      script.id = this.GOOGLE_ADSENSE_ID;
      script.async = true;
      script.src = `${ this.adsense }`;
      document.head.appendChild(script);
    }

    if ( canTracking )
    {
      this.addTag('config', config.analyticsId, { transport_type: 'beacon', send_page_view: !config.trackingPages });
      this.trackingPages(config && config.trackingPages);
    }
    return canTracking && !!document.getElementById(this.GOOGLE_ANALYTICS_ID);
  }

  addToCart(item: GoogleItem)
  {
    this.sendEvent(GoogleTags.ADD_TO_CART, {
      currency: this.config.currency,
      items: [ item ],
      value: item.price
    })
  }

  removeFromCart(item: GoogleItem)
  {
    this.sendEvent(GoogleTags.REMOVE_FROM_CART, {
      currency: this.config.currency,
      items: [ item ],
      value: item.price
    })
  }

  private trackingPages(tracking: boolean)
  {
    if ( this.router && tracking )
    {
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) =>
      {
        this.sendEvent(GoogleTags.PAGE_VIEW, {
          page_title: this.title.getTitle(),
          page_path: event.urlAfterRedirects,
          page_location: location.href
        })
      });
    }
  }
}
