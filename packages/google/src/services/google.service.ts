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

  private readonly scriptUrl: string = 'https://www.googletagmanager.com/gtag/js';
  private readonly elementId: string = 'ns-google-analytics';

  constructor(@Inject(NS_GOOGLE_CONFIG) private config: GoogleSetup,
              @Inject(PLATFORM_ID) private platformId: string,
              @Optional() private router: Router,
              private title: Title)
  {
    Object.assign(this.config, { currency: 'USD', trackingPages: true, enabled: true, ...this.config });
    this.init(this.config);
  }

  validateID(id: string)
  {
    return /^(G|AW|UA|GTM)-(\w+|\w+-\w+)$/i.test(id);
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
    (window as any).dataLayer = (window as any).dataLayer || [];
    const canInitialize = config && config.enabled && isPlatformBrowser(this.platformId) && this.validateID(config.analyticsId);

    if ( canInitialize && !document.getElementById(this.elementId) )
    {
      this.addTag('js', new Date());
      const script = document.createElement('script') as HTMLScriptElement;
      script.id = this.elementId;
      script.async = true;
      script.src = `${ this.scriptUrl }?id=${ config.analyticsId }`;
      document.head.appendChild(script);
    }

    if ( canInitialize )
    {
      this.addTag('config', config.analyticsId, { transport_type: 'beacon', send_page_view: !config.trackingPages });
      this.trackingPages(config && config.trackingPages);
    }
    return canInitialize && !!document.getElementById(this.elementId);
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
