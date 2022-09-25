import {
    AfterContentInit,
    Component,
    ContentChildren,
    ElementRef,
    forwardRef,
    HostListener,
    Input,
    OnInit,
    QueryList,
    ViewChild
} from '@angular/core';
import { FormControlValueAccessor } from '../../../form/models/form-control-value-accessor';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NsDropdownItemDirective } from '../directives/dropdown-item.directive';
import { isEmpty } from '@ng-solid/core';
import { IconKeys } from '../../../icon/icons';

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
export class NsDropdownComponent extends FormControlValueAccessor implements OnInit, AfterContentInit
{

    @Input()
    labelField = 'label';
    @Input()
    valueField = 'value';
    @Input()
    iconName: IconKeys;
    @Input()
    defaultFirst: boolean;
    @Input()
    labelTop: boolean = true;
    @Input()
    placement: 'start' | 'end' = 'start';
    @Input()
    filterable: boolean;

    @ViewChild( 'input', { read: ElementRef } ) searchRef: ElementRef<HTMLInputElement>;
    @ContentChildren( NsDropdownItemDirective ) items: QueryList<NsDropdownItemDirective>;

    public show: boolean = false;

    private _filtered: { [ key: string ]: any }[];
    private _collection: { [ key: string ]: any }[];
    private _search: string;

    constructor()
    {
        super();
    }

    ngOnInit(): void
    {
    }

    ngAfterContentInit()
    {
        if ( isEmpty( this.collection ) && !!this.items )
        {
            this.collection = this.items.toArray();
        }
    }

    @Input()
    set collection( source: { [ key: string ]: any }[] )
    {
        this._collection = this._filtered = source;
    };

    get collection()
    {
        return this.filterable ? this._filtered : this._collection;
    }

    get selected()
    {
        return this.collection.find( item => item[ this.valueField ] == this.value );
    }

    set search( value: string )
    {
        this._search = value;
        this._filtered = this._collection.filter( item => item[ this.labelField ].toLowerCase().includes( value.toLowerCase() ) );
        this.show = !!value;
    }

    get search()
    {
        return this._search;
    }

    @HostListener( 'click', [ '$event' ] )
    toggle( event: MouseEvent )
    {
        event.preventDefault();
        if ( !this.disabled )
        {
            this.show = !this.show;
            if ( this.filterable )
            {
                if ( this.show )
                {
                    this.searchRef.nativeElement.focus();
                } else
                {
                    this._search = '';
                    this._filtered = this._collection;
                }
            }
        }
    }

    @HostListener( 'keydown', [ '$event' ] )
    keyDown( event: KeyboardEvent )
    {
        if ( this.show )
        {
            let index: number = this.selected ? this.collection.findIndex( item => this.selected[ this.valueField ] === item[ this.valueField ] ) : -1;
            switch ( event.key )
            {
                case 'ArrowUp':
                    if ( index >= 1 )
                    {
                        this.value = this.collection[ --index ][ this.valueField ];
                    }
                    break;
                case 'ArrowDown':
                    if ( index < this.collection.length - 1 )
                    {
                        this.value = this.collection[ ++index ][ this.valueField ];
                    }
                    break;
                case 'Enter':
                    event.preventDefault();
                    this._search = '';
                    this.show = false;
            }
        } else if ( event.key == 'Enter' )
        {
            event.preventDefault();
            this._search = '';
            this._filtered = this._collection;
            this.show = true;
        }
    }
}
