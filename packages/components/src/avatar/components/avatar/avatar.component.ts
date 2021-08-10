import { Component, forwardRef, HostBinding, Input, OnInit } from '@angular/core';
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
  ]
})
export class NsAvatarComponent extends FormControlValueAccessor<string> implements OnInit
{

  @Input()
  @HostBinding('class.ns-avatar-rounded')
  rounded: boolean = true;
  @Input()
  size: number = 60;

  public fillColor: string
  private _shortName: string;

  ngOnInit(): void
  {
    this.fillColor = `#${ Math.floor(Math.random() * 16777215).toString(16) }`;
  }

  @HostBinding('style.width.px')
  get width()
  {
    return this.size
  }

  @HostBinding('style.height.px')
  get height()
  {
    return this.size - (this.size * 0.09);
  }

  get canShowImage()
  {
    return isValidURL(this.value) || this.value && this.value.startsWith('data:image');
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
}
