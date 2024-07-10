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
export class NsInputNumberComponent extends NsFormControlValueAccessor<number>
{
    @Input( { transform: booleanAttribute } ) format: boolean = true;
    @Input() min: number = -Infinity;
    @Input() max: number = Infinity;
    @Input() step: number;
    @Input() precision?: number;
    @Input() precisionMode?: 'cut' | 'toFixed' | ( ( value: number | string, precision: number ) => number ) = 'toFixed';
    @Input() inputMode: 'decimal' | 'numeric' = 'decimal';

    @ViewChild( 'input', { static: true } ) input: ElementRef<HTMLInputElement>;

    override writeValue( value: unknown )
    {
        if ( !isNullOrUndefined( value ) )
        {
            const formatted = this.formatValue( value as string );
            this.input.nativeElement.value = formatted;
            this._value = this.toNumber( formatted );
        }
    }

    onModelChange( value: string ): void
    {
        const formatted = this.formatValue( value );
        this.input.nativeElement.value = formatted;
        this.value = this.toNumber( formatted );
    }

    onFocusOut( event: FocusEvent )
    {
        const input = event.target as HTMLInputElement;
        if ( !!input.value && !isNullOrUndefined( this.precision ) )
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

        if ( value && String( value ).indexOf( '.' ) !== 0 )
        {
            trimmed = String( value ).replace( /[^\d.]+/g, '' );
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
            return [ integer, decimals ].join( '.' );
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

    private toNumber( num: string | number ): number
    {
        if ( this.isNotCompleteNumber( num ) )
        {
            return Number( num );
        }
        const numStr = String( num );
        if ( numStr.includes( '.' ) && !isNullOrUndefined( this.precision ) )
        {
            if ( typeof this.precisionMode === 'function' )
            {
                return this.precisionMode( num, this.precision );
            } else if ( this.precisionMode === 'cut' )
            {
                const numSplit = numStr.split( '.' );
                numSplit[ 1 ] = numSplit[ 1 ].slice( 0, this.precision );
                return Number( numSplit.join( '.' ) );
            }
            return Number( Number( num ).toFixed( this.precision ) );
        }
        return Number( num );
    }
}
