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
  layout: 'standard' | 'button_count' | 'button' | 'box_count' = 'standard';
  @Input()
  rounded: boolean;
  @Input()
  disabled: boolean = true;
  @Input()
  href: string;

  constructor() { }

  ngOnInit(): void
  {
  }

}
