import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NsFormControlValueAccessor } from '../../models/form-control-value-accessor';
import { YesNo } from '@ng-solid/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component( {
    selector: 'ns-switch',
    templateUrl: './switch.component.html',
    styleUrls: [ './switch.component.scss' ],
    providers: [ {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef( () => NsSwitchComponent ),
        multi: true
    } ],
    host: {
        '[class.ns-switch]': 'true'
    }
} )
export class NsSwitchComponent extends NsFormControlValueAccessor implements OnInit
{

    @Input()
    boolean: boolean = true;

    ngOnInit()
    {
    }

    @Input()
    set value( checked: boolean )
    {
        this._value = checked;
        this.onChange( this.boolean ? checked : YesNo.yesOrNo( checked ) );
    }

    get value()
    {
        return this._value;
    }

}
