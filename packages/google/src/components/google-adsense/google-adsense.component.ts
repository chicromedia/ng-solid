import { AfterViewInit, Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { NS_GOOGLE_CONFIG } from "../../providers/google-setup.provider";
import { GoogleSetup } from "../../interfaces/google-setup";
import { isPlatformBrowser } from "@angular/common";

@Component({
  selector: 'ns-adsense',
  templateUrl: './google-adsense.component.html',
  styleUrls: [ './google-adsense.component.scss' ]
})
export class GoogleAdsenseComponent implements OnInit, AfterViewInit
{
  @Input() client: string;
  @Input() slot: string | number;
  @Input() format: GoogleAdFormat;
  @Input() display: string;
  @Input() width: number | string;
  @Input() height: number | string;
  @Input() layout: string;
  @Input() layoutKey: string;
  @Input() pageLevelAds: boolean;
  @Input() response: boolean;
  @Input() className: string;

  adRegion = 'page-' + Math.floor(Math.random() * 10000) + 1;

  @ViewChild('ins', { read: ElementRef, static: true }) ins: ElementRef;

  constructor(@Inject(NS_GOOGLE_CONFIG) private _config: GoogleSetup, @Inject(PLATFORM_ID) private platform: any)
  { }

  ngOnInit(): void
  {
    this.className = this.className || this.config.adClassName;
  }

  get config()
  {
    return this._config;
  }

  get classes()
  {
    return { 'adsbygoogle': true, [this.className]: !!this.className }
  };

  get widthStyle(): string
  {
    if ( this.width )
    {
      return typeof this.width === "string" ? this.width : `${ this.width }px`;
    }
    const width = this.config.adWidth;
    return width ? `${ width }px` : '100%';
  };

  get heightStyle(): string
  {
    if ( this.height )
    {
      return typeof this.height === "string" ? this.height : `${ this.height }px`;
    }
    const height = this.config.adHeight;
    return height ? `${ height }px` : 'auto';
  };

  ngAfterViewInit(): void
  {
    if ( isPlatformBrowser(this.platform) )
    {
      const page: Record<string, string | boolean> = {};
      if ( this.pageLevelAds )
      {
        page.google_ad_client = this.client;
        page.enable_page_level_ads = true;
      }

      if ( typeof window !== "undefined" )
      {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(page);
      }
    }
  }

  ngOnDestroy(): void
  {
    const iframe = this.ins.nativeElement.querySelector('iframe');
    if ( iframe && iframe.contentWindow )
    {
      iframe.src = 'about:blank';
      iframe.remove();
    }
  }

}
