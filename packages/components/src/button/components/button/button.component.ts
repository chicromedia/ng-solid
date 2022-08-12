import { Component, Input, OnInit } from '@angular/core';

@Component( {
    selector: 'ns-button',
    templateUrl: './button.component.html',
    styleUrls: [ './button.component.scss' ],
    host: {
        '[class.ns-button__grid]': 'isBlock',
        '[class.ns-button--loading]': 'loading',
        '[class.ns-button--disabled]': 'disabled'
    }
} )
export class NsButtonComponent implements OnInit
{
    @Input()
    label: string;
    @Input()
    type: 'submit' | 'button' | 'link' = 'button';
    @Input()
    primary: boolean;
    @Input()
    href: string;
    @Input()
    isBlock: boolean;
    @Input()
    disabled: boolean;
    @Input()
    loading: boolean;

    constructor()
    {
    }

    ngOnInit(): void
    {
    }

}
