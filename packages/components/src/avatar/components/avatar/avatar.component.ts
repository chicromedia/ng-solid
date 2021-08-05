import { Component, Input, OnInit } from '@angular/core';
import { isValidURL } from "@ng-solid/core";

@Component({
  selector: 'ns-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: [ './avatar.component.scss' ]
})
export class NsAvatarComponent implements OnInit
{
  @Input()
  src: string;
  @Input()
  name: string;
  @Input()
  size: number = 60;

  public fillColor: string

  constructor() { }

  ngOnInit(): void
  {
    this.fillColor = `#${ Math.floor(Math.random() * 16777215).toString(16) }`;
  }

  get canShowImage()
  {
    return isValidURL(this.src);
  }

  get shortName()
  {
    return this.name ? this.name.split(' ', 2).map(n => n.charAt(0).toUpperCase()).join('') : '';
  }
}
