import { Injectable } from '@angular/core';
import { ITwitterShare } from "../interfaces/share";
import { NsWindowService } from "@ng-solid/core";

@Injectable({
  providedIn: 'root'
})
export class NsTwitterService
{

  private baseUrl: string = 'https://twitter.com/intent/tweet';
  private width: number = 550;
  private height: number = 350;
  private lastPopup: any;

  constructor(private window: NsWindowService)
  {
  }

  share(setup: ITwitterShare)
  {
    const values = Object.entries(setup)
      .filter(item => !!item[1])
      .map(([ key, value ]) => ({ [key]: value }));

    const params = new URLSearchParams(Object.assign({}, ...values));
    const url = `${ this.baseUrl }?${ params.toString() }`;
    const left = Math.round((screen.width / 2) - (this.width / 2));

    let top = 0;
    if ( screen.height > this.height )
    {
      top = Math.round((screen.height / 2) - (this.height / 2));
    }

    const features = [
      "toolbar=0",
      "status=0",
      `width=${ this.width }`,
      `height=${ this.height }`,
      `left=${ left }`,
      `top=${ top }`
    ];
    this.lastPopup = this.window.navigateTo(url, "Twitter", features);
  }
}
