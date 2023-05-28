import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NsFormControlValueAccessor } from '../../models/form-control-value-accessor';

@Component( {
    selector: 'ns-input-group',
    templateUrl: './input-group.component.html',
    styleUrls: [ './input-group.component.scss' ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef( () => NsInputGroupComponent ),
            multi: true
        }
    ]
} )
export class NsInputGroupComponent extends NsFormControlValueAccessor implements OnInit
{

    @Input()
    prepend: string;
    @Input()
    append: string;

    constructor()
    {
        super();
    }

    ngOnInit(): void
    {
    }

}
