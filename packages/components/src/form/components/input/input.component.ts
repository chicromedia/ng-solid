import {Component, forwardRef, Input, OnInit} from '@angular/core';
import { FormControlValueAccessor } from '../../models/form-control-value-accessor';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ns-input',
  templateUrl: './input.component.html',
  styleUrls: [ './input.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NsInputComponent),
      multi: true
    }
  ]
})
export class NsInputComponent extends FormControlValueAccessor implements OnInit
{

  @Input()
  prepend: string;
  @Input()
  append: string;

  constructor() {super();}

  ngOnInit(): void
  {
  }

}
