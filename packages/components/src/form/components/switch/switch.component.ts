import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormControlValueAccessor } from "../../models/form-control-value-accessor";
import { YesNo } from "@ng-solid/core";

@Component({
  selector: 'ns-switch',
  templateUrl: './switch.component.html',
  styleUrls: [ './switch.component.scss' ]
})
export class NsSwitchComponent extends FormControlValueAccessor implements OnInit
{

  @Input()
  autoChange: boolean = true;

  ngOnInit()
  {
  }

  writeValue(value: string)
  {
    if ( !this.disabled )
    {
      super.writeValue(value);
    }
  }

  @HostListener('click', [ '$event' ])
  onClick(event)
  {
    if ( this.autoChange && !this.disabled )
    {
      this.value = YesNo.isYes(this.value) ? YesNo.NO : YesNo.YES;
    }
  }

  get checked()
  {
    return YesNo.isYes(this.value);
  }

}
