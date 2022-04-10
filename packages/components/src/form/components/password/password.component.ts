import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControlValueAccessor } from "../../models/form-control-value-accessor";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'ns-password',
  templateUrl: './password.component.html',
  styleUrls: [ './password.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NsPasswordComponent),
      multi: true
    }
  ]
})
export class NsPasswordComponent extends FormControlValueAccessor implements OnInit
{

  @Input()
  forgotLink: string;
  @Input()
  showAndHide: boolean;

  public show: boolean;

  constructor()
  {
    super();
  }

  ngOnInit()
  {
  }

  toggle()
  {
    this.show = !this.show;
  }
}
