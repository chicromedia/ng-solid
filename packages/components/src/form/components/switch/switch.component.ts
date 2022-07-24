import { Component, Input, OnInit } from '@angular/core';
import { FormControlValueAccessor } from '../../models/form-control-value-accessor';
import { YesNo } from '@ng-solid/core';

@Component( {
    selector: 'ns-switch',
    templateUrl: './switch.component.html',
    styleUrls: [ './switch.component.scss' ],
    host: {
        '[class.ns-switch]': 'true'
    }
} )
export class NsSwitchComponent extends FormControlValueAccessor implements OnInit
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
