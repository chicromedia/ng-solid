import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { isValidURL } from "@ng-solid/core";
import { FormControlValueAccessor } from "../../../form/models/form-control-value-accessor";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'ns-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: [ './avatar.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NsAvatarComponent),
      multi: true
    }
  ],
  host: {
    '[class.ns-avatar]': 'true',
    '[class.ns-avatar-rounded]': 'rounded == true',
    '[style.width.px]': 'size',
    '[style.height.px]': 'size'
  }
})
export class NsAvatarComponent extends FormControlValueAccessor<string> implements OnInit
{

  @Input()
  rounded: boolean = true;
  @Input()
  size: number = 60;

  public fillColor: string
  private _shortName: string;

  ngOnInit(): void
  {
    this.fillColor = `#${ Math.floor(Math.random() * 16777215).toString(16) }`;
  }

  get canShowImage()
  {
    return isValidURL(this.value) || this.value && this.value.startsWith('data:image');
  }

  @Input()
  set src(value: string)
  {
    this._value = value;
  }

  @Input()
  set shortName(name: string)
  {
    this._shortName = name ? name.split(' ', 2).map(n => n.charAt(0).toUpperCase()).join('') : ''
  }

  get shortName()
  {
    return this._shortName;
  }

  get fontSize()
  {
    return `calc(${this.size}px/2.2)`;
  }
}
