import { ControlValueAccessor } from "@angular/forms";
import { HostBinding, Input } from "@angular/core";
import { Guid } from "@ng-solid/core";

export abstract class FormControlValueAccessor<T = any> implements ControlValueAccessor
{

  @Input()
  public type: string = 'text';
  @Input()
  public placeholder: string = '';
  @Input()
  public label: string;

  @HostBinding('attr.id') id = Guid.create();

  public onTouched = () => {};
  public onChange = (value: T) => {};
  protected _value: T;

  public disabled: boolean;

  writeValue(value: T): void
  {
    if ( typeof value !== 'undefined' )
    {
      this._value = value;
    }
  }

  @Input()
  set value(value: T)
  {
    if ( typeof value !== 'undefined' )
    {
      this._value = value;
      this.onChange(this._value);
    }
  }

  get value(): T
  {
    return this._value;
  }

  registerOnChange(fn: (value: T) => void): void
  {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void
  {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void
  {
    this.disabled = isDisabled;
  }
}
