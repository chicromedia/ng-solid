import { Component, Input, OnInit } from '@angular/core';
import { NS_BUTTON_STYLES_HOST } from "../../providers/btn.provider";

@Component({
  selector: 'ns-facebook-share',
  templateUrl: './share.component.html',
  styleUrls: [ './share.component.scss' ],
  host: NS_BUTTON_STYLES_HOST
})
export class NsFacebookShareComponent implements OnInit
{

  @Input()
  size: fb.FacebookButtonSize = 'large';
  @Input()
  layout: 'default' | 'rounded' = 'default';

  constructor() { }

  ngOnInit(): void
  {
  }

}
