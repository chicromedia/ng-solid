import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
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
  @Input() adClient: string;
  @Input() adSlot: string | number;
  @Input() adFormat: string = 'auto';
  @Input() adRegion = 'page-' + Math.floor(Math.random() * 10000) + 1;
  @Input() display: string = 'flex';
  @Input() width: number;
  @Input() height: number;
  @Input() layout: string;
  @Input() layoutKey: string;
  @Input() pageLevelAds: boolean;
  @Input() fullWidthResponsive: boolean;
  @HostBinding('class') adClassName: string;

  @ViewChild('ins', { read: ElementRef, static: true }) ins: ElementRef;

  constructor(@Inject(NS_GOOGLE_CONFIG) private config: GoogleSetup, @Inject(PLATFORM_ID) private platform: any)
  { }

  ngOnInit(): void
  {
    Object.entries(this.config).forEach(([ key, value ]) =>
    {
      if ( typeof this[key] === "undefined" )
      {
        this[key] = value;
      }
    })
  }

  ngAfterViewInit(): void
  {
    if ( isPlatformBrowser(this.platform) )
    {
      const page: Record<string, string | boolean> = {};
      if ( this.pageLevelAds )
      {
        page.google_ad_client = this.adClient;
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
