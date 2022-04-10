import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControlValueAccessor } from "../../models/form-control-value-accessor";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: 'ns-date',
  templateUrl: './date.component.html',
  styleUrls: [ './date.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NsDateComponent),
      multi: true
    }
  ]
})
export class NsDateComponent extends FormControlValueAccessor implements OnInit
{

  private readonly FIELDS: string[] = [ 'year', 'month', 'day' ];

  @Input()
  public fields: string[] = this.FIELDS;
  @Input()
  public locale: string = 'en';

  public day: string = '';
  public month: string = '';
  public year: string = '';
  public months: Map<number, string> = new Map<number, string>(this.monthInString.entries());

  constructor()
  {
    super();
  }

  ngOnInit()
  {

  }

  writeValue(value: string)
  {
    if ( value )
    {
      [ this.year, this.month, this.day ] = String(value).split('-');
    }
  }

  changeDate()
  {
    const fields = this.fields.sort(
      (a, b) => this.FIELDS.indexOf(a) - this.FIELDS.indexOf(b)
    ).map(part => this[part]);

    if ( !!fields.length )
    {
      this.value = fields.join('-');
      this.onTouched();
    }
  }

  get daysItems()
  {
    const days = new Date(Number(this.year), Number(this.month), 0).getDate();
    return Array.from({ length: days }, (x, i) => i < 9 ? `0${ i + 1 }` : i + 1);
  }

  get monthItems()
  {
    return Array.from({ length: 12 }, (x, i) => i < 9 ? `0${ i + 1 }` : i + 1);
  }

  get monthInString()
  {
    return Array.from({ length: 12 }, (e, i) =>
      new Date(null, i + 1, null).toLocaleDateString(this.locale, { month: "short" })
    )
  }

  get yearItems()
  {
    const year = new Date().getFullYear();
    return Array.from({ length: year - (year - 61) }, (x, i) => year - i);
  }

}
