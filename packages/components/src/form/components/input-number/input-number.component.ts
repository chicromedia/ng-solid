import { booleanAttribute, Component, ElementRef, forwardRef, Input, Provider, ViewChild } from '@angular/core';
import { NsFormControlValueAccessor } from '../../models/form-control-value-accessor';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { isNullOrUndefined } from '@ng-solid/core';

const NS_INPUT_NUMBER_PROVIDER: Provider = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef( () => NsInputNumberComponent ),
    multi: true
};

@Component( {
    selector: 'ns-input-number',
    template: `
        <ng-container *ngIf="label">
            <label class="form-label" [attr.for]="id">{{ label }}</label>
        </ng-container>

        <input #input
               class="form-control"
               autocomplete="off"
               [attr.id]="id"
               [attr.min]="min"
               [attr.max]="max"
               [attr.readonly]="readonly"
               [attr.step]="step"
               [attr.inputmode]="inputMode"
               [placeholder]="placeholder"
               [disabled]="disabled"
               [ngModel]="value"
               (ngModelChange)="onModelChange($event)"
               (focusout)="onFocusOut($event)"

        >`,
    styleUrls: [ './input-number.component.scss' ],
    providers: [ NS_INPUT_NUMBER_PROVIDER ]
} )
export class NsInputNumberComponent extends NsFormControlValueAccessor<string>
{
    @Input( { transform: booleanAttribute } ) format: boolean = true;
    @Input() min: number = -Infinity;
    @Input() max: number = Infinity;
    @Input() step: number;
    @Input() precision?: number;
    @Input() precisionMode?: 'cut' | 'toFixed' | ( ( value: number | string, precision: number ) => string ) = 'toFixed';
    @Input() inputMode: 'decimal' | 'numeric' = 'decimal';

    @ViewChild( 'input', { static: true } ) input: ElementRef<HTMLInputElement>;

    override writeValue( value: unknown )
    {
        const displayValue = !isNullOrUndefined( value ) ? this.formatValue( value as string ) : '';
        this.input.nativeElement.value = `${ displayValue }`;
        this._value = displayValue;
    }

    onModelChange( value: string ): void
    {
        const formatted = this.formatValue( value );
        this.input.nativeElement.value = formatted;
        this.value = this.toFixed( formatted );
    }

    onFocusOut( event: FocusEvent )
    {
        const input = event.target as HTMLInputElement;
        if ( !!input.value )
        {
            if ( input.value.includes( '.' ) )
            {
                const [ integer, decimals ] = input.value.split( '.' );
                this.onModelChange( `${ integer }.${ decimals.padEnd( this.precision, '0' ) }` );
            } else
            {
                this.onModelChange( `${ input.value }.${ ''.padEnd( this.precision, '0' ) }` );
            }
        }
    }

    private formatValue( value: string ): string
    {
        let trimmed = '';

        if ( value.indexOf( '.' ) !== 0 )
        {
            trimmed = value.replace( /[^\d.]+/g, '' );
            if ( trimmed.split( '.' ).length > this.precision )
            {
                trimmed = trimmed.replace( /\.([^.]*)$/, '$1' );
            }
        }

        return this.truncate( trimmed );
    }

    private truncate( value: string ): string
    {
        let [ integer, decimals ] = value.split( '.' );

        if ( integer.length > this.max )
        {
            integer = integer.substring( 0, this.max );
        }

        if ( decimals !== undefined )
        {
            if ( decimals.length > this.precision )
            {
                decimals = decimals.substring( 0, this.precision );
            }
            return `${ integer }.${ decimals }`;
        }

        return integer;
    }

    // '1.' '1x' 'xx' '' => are not complete numbers
    isNotCompleteNumber( num: string | number ): boolean
    {
        return (
            isNaN( num as number ) ||
            num === '' ||
            num === null ||
            !!( num && num.toString().indexOf( '.' ) === num.toString().length - 1 )
        );
    }

    private toFixed( num: string | number ): string
    {
        if ( this.isNotCompleteNumber( num ) )
        {
            return num as string;
        }
        const numStr = String( num );
        if ( numStr.indexOf( '.' ) >= 0 && !isNullOrUndefined( this.precision ) )
        {
            if ( typeof this.precisionMode === 'function' )
            {
                return this.precisionMode( num, this.precision ) as string;
            } else if ( this.precisionMode === 'cut' )
            {
                const numSplit = numStr.split( '.' );
                numSplit[ 1 ] = numSplit[ 1 ].slice( 0, this.precision );
                return numSplit.join( '.' );
            }
            return Number( num ).toFixed( this.precision );
        }
        return num as string;
    }
}
