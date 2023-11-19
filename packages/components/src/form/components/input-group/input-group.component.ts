import { Component, forwardRef, Input } from '@angular/core';
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
export class NsInputGroupComponent extends NsFormControlValueAccessor
{
    @Input()
    prepend: string;
    @Input()
    append: string;
    @Input()
    iconName: string;
}
