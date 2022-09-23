import {
    Directive,
    ElementRef,
    HostBinding,
    HostListener,
    Inject,
    Input,
    OnInit,
    Optional,
    PLATFORM_ID,
    Renderer2,
    Self
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl, Validator } from '@angular/forms';

@Directive( {
    selector: '[nsDateMask]'
} )
export class MaskDirective<T = string | Date> implements OnInit, ControlValueAccessor, Validator
{

    @Input()
    separator: string = '/';

    @HostBinding( 'attr.maxlength' )
    maxLength: number = 10;

    @HostListener( 'input', [ '$event.target.value' ] )
    onInput = ( _: any ) => this.onChange( _ );

    @HostListener( 'blur', [ '$event.target.value' ] )
    onTouched = ( _: any ) =>
    {
    };

    onChange: ( value: string ) => void = () =>
    {
    };

    private patternDate = /^\d{2}\/\d{2}\/\d{4}$/;

    constructor( @Inject( PLATFORM_ID ) private platformId: string,
                 private elementRef: ElementRef<HTMLInputElement>,
                 private renderer: Renderer2,
                 @Optional() @Self() public ngControl: NgControl | null, )
    {
        if ( this.ngControl != null )
        {
            this.ngControl.valueAccessor = this;
        }
    }

    ngOnInit()
    {
        if ( this.control )
        {
            this.control.setValidators(
                this.control.validator
                    ? [ this.control.validator, this.validate ]
                    : [ this.validate ]
            );
            this.control.updateValueAndValidity();
        }
    }

    writeValue( value: string | Date ): void
    {
        if ( this.elementRef.nativeElement )
        {
            if ( value instanceof Date )
            {
                value = [ value.getDate(), value.getMonth(), value.getFullYear() ]
                    .map( p => p < 9 ? `0${ p }` : p )
                    .join( '/' );
            }
            this.renderer.setProperty( this.elementRef.nativeElement, 'value', value ?? '' );
        }
    }

    @HostListener( 'keypress', [ '$event' ] )
    onKeyPress = ( event: KeyboardEvent ) =>
    {
        if ( event.key < this.separator || event.key > '9' )
        {
            event.preventDefault();
        }

        const length = this.elementRef.nativeElement.value.length;
        if ( length !== 1 && length !== 3 && event.key == this.separator )
        {
            event.preventDefault();
        }
        if ( length === 2 || length === 5 )
        {
            this.renderer.setAttribute( this.elementRef.nativeElement, 'value', `${ this.elementRef.nativeElement.value }${ this.separator }` );
            this.onChange( this.elementRef.nativeElement.value );
        }
    };

    registerOnChange( fn: any ): void
    {
        this.onChange = fn;
    }

    registerOnTouched( fn: any ): void
    {
        this.onTouched = fn;
    }

    validate = ( control: AbstractControl ) =>
    {
        return ( typeof control.value == 'string' && control.value.match( this.patternDate ) ) || control.value instanceof Date
            ? null
            : { 'date_format_invalid': true };
    };

    private get control(): AbstractControl | null | undefined
    {
        return this.ngControl?.control;
    }

    setDisabledState( disabled: boolean ): void
    {
        if ( this.elementRef.nativeElement )
        {
            this.renderer.setProperty( this.elementRef.nativeElement, 'disabled', disabled );
        }
    }

}
