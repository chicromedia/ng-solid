import { Directive, Input } from '@angular/core';

@Directive( {
    selector: 'ns-dropdown-item'
} )
export class NsDropdownItemDirective
{

    @Input()
    label: string;
    @Input()
    value: string | number;
    @Input()
    disabled: boolean = false;

    constructor() { }

}
