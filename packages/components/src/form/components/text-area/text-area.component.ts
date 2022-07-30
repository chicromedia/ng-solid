import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControlValueAccessor } from '../../models/form-control-value-accessor';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component( {
  selector: 'ns-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: [ './text-area.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => NsTextAreaComponent ),
      multi: true
    }
  ]
} )
export class NsTextAreaComponent extends FormControlValueAccessor<string> implements OnInit
{

  @Input()
  rows: number = 3;

  constructor()
  {
    super();
  }

  ngOnInit(): void
  {
  }

}
