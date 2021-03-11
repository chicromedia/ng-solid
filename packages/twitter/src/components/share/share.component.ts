import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NsTwitterService } from "../../services/twitter.service";
import { NS_BUTTON_STYLES_HOST } from "../../providers/btn.style";

@Component({
  selector: 'ns-twitter-share',
  template: `
		<span class="twitter-button-text">
		  <ng-content></ng-content>
    </span>
  `,
  styleUrls: [ './share.component.scss' ],
  host: NS_BUTTON_STYLES_HOST
})
export class NsTwitterComponent implements OnInit
{

  @Input()
  text: string;
  @Input()
  url: string;
  @Input()
  hashtags: string;
  @Input()
  via: string
  @Input()
  size: string = 'large';
  @Input()
  layout: 'default' | 'rounded' = 'default';
  @Input()
  rounded: boolean;
  @Input()
  disabled: boolean = true;

  constructor(private twitter: NsTwitterService) { }

  ngOnInit(): void
  {
  }

  @HostListener('click', [ "$event" ])
  onClick(event: any)
  {
    this.twitter.share({
      text: this.text,
      url: this.url,
      hashtags: this.hashtags,
      via: this.via
    })
  }

}
