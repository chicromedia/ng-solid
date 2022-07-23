import { Component, ElementRef, forwardRef, HostBinding, HostListener, Input, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormControlValueAccessor } from '../../models/form-control-value-accessor';

@Component( {
    selector: 'ns-content-editable',
    template: '',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef( () => NsFormContentEditableComponent ),
            multi: true
        }
    ],
    styles: [
        ':host{display:block; position:relative; background-color:#fff; width:100%; height:fit-content; min-height:7rem; outline:none;}',
        ':host.ns-content__disabled{background-color: #e9ecef}'
    ],
    host: {
        '[class.ns-content__disabled]': 'disabled'
    }
} )
export class NsFormContentEditableComponent extends FormControlValueAccessor<string>
{
    @Input( 'maxlength' )
    maxLength: number;

    @HostBinding( 'attr.contenteditable' )
    enabled: boolean = true;

    constructor( private elementRef: ElementRef, private renderer: Renderer2 )
    {
        super();
    }

    writeValue( value: string ): void
    {
        if ( typeof value !== 'undefined' )
        {
            this.renderer.setProperty( this.elementRef.nativeElement, 'innerHTML', value || '' );
        }
    }

    @HostListener( 'input' )
    onInput(): void
    {
        this.onChange( this.elementRef.nativeElement.innerHTML );
    }

    @HostListener( 'blur' )
    onBlur(): void
    {
        this.onTouched();
    }

    @HostListener( 'keydown', [ '$event' ] )
    onKeyUp( event: KeyboardEvent )
    {
        if ( this.maxLength && this.elementRef.nativeElement.innerText.length >= this.maxLength && event.key !== 'Backspace' )
        {
            event.preventDefault();
        }
    }

    setDisabledState( isDisabled: boolean )
    {
        this.disabled = isDisabled;
        this.enabled = !isDisabled;
    }
}
