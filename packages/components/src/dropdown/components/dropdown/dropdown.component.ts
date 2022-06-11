import { Component, ContentChildren, forwardRef, OnInit, QueryList, Input, HostListener } from '@angular/core';
import { FormControlValueAccessor } from '../../../form/models/form-control-value-accessor';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NsDropdownItemDirective } from '../directives/dropdown-item.directive';
import { notEmpty } from "@ng-solid/core";

@Component( {
    selector: 'ns-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: [ './dropdown.component.scss' ],
    host: {
        '[class.dropdown]': 'true',
        '[class.show]': 'show'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef( () => NsDropdownComponent ),
            multi: true
        }
    ]
} )
export class NsDropdownComponent extends FormControlValueAccessor implements OnInit
{

    @Input()
    labelField = 'label';
    @Input()
    valueField = 'value';
    @Input()
    collection: { [ key: string ]: any }[];
    @Input()
    iconName: string;
    @Input()
    defaultFirst: boolean = true;

    @ContentChildren( NsDropdownItemDirective ) items: QueryList<NsDropdownItemDirective>;

    public show: boolean = false;

    constructor() { super(); }

    ngOnInit(): void
    {
    }

    writeValue( value: any )
    {
        if ( typeof value !== "undefined" )
        {
            this._value = notEmpty( this.collection )
                ? this.collection.find( item => item[ this.valueField ] == value )
                : this.items.find( item => item[ this.valueField ] == value )
        }
    }

    @Input()
    set value( value: any )
    {
        if ( typeof value !== 'undefined' )
        {
            this._value = value;
            this.onChange( this._value[ this.valueField ] );
        }
    }

    get value()
    {
        return this._value;
    }

    @HostListener( 'click' )
    onClick()
    {
        this.show = !this.show;
    }

    @HostListener( 'mouseleave' )
    onFocusout()
    {
        this.show = false;
    }
}
