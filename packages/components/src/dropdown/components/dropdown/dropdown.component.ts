import { AfterContentInit, Component, ContentChildren, forwardRef, HostListener, Input, OnInit, QueryList } from '@angular/core';
import { FormControlValueAccessor } from '../../../form/models/form-control-value-accessor';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NsDropdownItemDirective } from '../directives/dropdown-item.directive';
import { isEmpty } from '@ng-solid/core';

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
    collection: { [ key: string ]: any }[];
    @Input()
    iconName: string;
    @Input()
    defaultFirst: boolean;
    @Input()
    labelTop: boolean = true;
    @Input()
    placement: 'start' | 'end' = 'start';

    @ContentChildren( NsDropdownItemDirective ) items: QueryList<NsDropdownItemDirective>;

    public show: boolean = false;

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

    get selected()
    {
        return this.collection.find( item => item[ this.valueField ] == this.value );
    }

    @HostListener( 'click', [ '$event' ] )
    onClick( event: MouseEvent )
    {
        event.preventDefault();
        if ( !this.disabled )
        {
            this.show = !this.show;
        }
    }
}
