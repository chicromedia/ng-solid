import { Component, forwardRef, Input } from '@angular/core';
import { NsFormControlValueAccessor } from '../../models/form-control-value-accessor';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component( {
    selector: 'ns-input',
    templateUrl: './input.component.html',
    styleUrls: [ './input.component.scss' ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef( () => NsInputComponent ),
            multi: true
        }
    ]
} )
export class NsInputComponent extends NsFormControlValueAccessor<string>
{
    @Input()
    prepend: string;
    @Input()
    append: string;
}
