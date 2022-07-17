import { ControlValueAccessor } from '@angular/forms';
import { Directive, Input } from '@angular/core';
import { Guid } from '@ng-solid/core';

@Directive()
export abstract class FormControlValueAccessor<T = any> implements ControlValueAccessor
{

    @Input()
    public type = 'text';
    @Input()
    public placeholder = '';
    @Input()
    public label: string;
    @Input()
    public disabled: boolean;

    public id = Guid.create();

    protected _value: T;

    public onTouched = () => {};
    public onChange = ( value: T ) => {};

    constructor()
    {
    }

    writeValue( value: T ): void
    {
        if ( typeof value !== 'undefined' )
        {
            this._value = value;
        }
    }

    @Input()
    set value( value: T )
    {
        if ( typeof value !== 'undefined' )
        {
            this._value = value;
            this.onChange( this._value );
        }
    }

    get value(): T
    {
        return this._value;
    }

    registerOnChange( fn: ( value: T ) => void ): void
    {
        this.onChange = fn;
    }

    registerOnTouched( fn: () => void ): void
    {
        this.onTouched = fn;
    }

    setDisabledState( isDisabled: boolean ): void
    {
        this.disabled = isDisabled;
    }
}
