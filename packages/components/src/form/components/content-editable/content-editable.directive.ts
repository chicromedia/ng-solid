import {
    Component,
    Directive,
    ElementRef,
    forwardRef,
    HostBinding,
    HostListener,
    Input,
    Renderer2
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { FormControlValueAccessor } from "../../models/form-control-value-accessor";

@Component( {
    selector: 'ns-content-editable',
    template: '',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef( () => NsFormContentEditableComponent ),
            multi: true
        }
    ]
} )
export class NsFormContentEditableComponent extends FormControlValueAccessor<string>
{
    @Input( 'maxlength' )
    maxLength: number;

    @HostBinding( 'attr.contenteditable' )
    enabled: boolean = true;

    constructor( private elementRef: ElementRef, private renderer: Renderer2 )
    {
        super()
    }

    writeValue( value: string ): void
    {
        this.renderer.setProperty( this.elementRef.nativeElement, 'innerText', value || '' );
    }

    @HostListener( 'input' )
    onInput(): void
    {
        this.onChange( this.elementRef.nativeElement.innerText );
    }

    @HostListener( 'blur' )
    onBlur(): void
    {
        this.onTouched();
    }

    @HostListener( 'keydown', [ "$event" ] )
    onKeyUp( event: KeyboardEvent )
    {
        if ( this.maxLength && this.elementRef.nativeElement.innerText.length >= this.maxLength && event.key !== "Backspace" )
        {
            event.preventDefault();
        }
    }
}
