import { Component, forwardRef, OnInit } from '@angular/core';
import { NsFormControlValueAccessor } from "../../models/form-control-value-accessor";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'ns-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: [ './checkbox.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NsCheckboxComponent),
      multi: true
    }
  ]
})
export class NsCheckboxComponent extends NsFormControlValueAccessor implements OnInit
{

  constructor()
  {
    super();
  }

  ngOnInit(): void
  {
  }

}
