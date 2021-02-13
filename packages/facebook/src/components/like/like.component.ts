import { Component, Input, OnInit } from '@angular/core';
import { NS_BUTTON_STYLES_HOST } from "../../providers/btn.provider";

@Component({
  selector: 'ns-facebook-like',
  templateUrl: './like.component.html',
  styleUrls: [ './like.component.scss' ],
  host: NS_BUTTON_STYLES_HOST
})
export class NsFacebookLikeComponent implements OnInit
{

  @Input()
  size: fb.FacebookButtonSize = 'large';
  @Input()
  layout: 'default' | 'rounded' = 'default';
  @Input()
  rounded: boolean;
  @Input()
  disabled: boolean = true;

  constructor() { }

  ngOnInit(): void
  {
  }

}
