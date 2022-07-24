import { Component, Input, OnInit } from '@angular/core';

@Component( {
    selector: 'ns-button',
    templateUrl: './button.component.html',
    styleUrls: [ './button.component.scss' ],
    host: {
        '[class.d-grid]': 'isBlock'
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

    constructor()
    {
    }

    ngOnInit(): void
    {
    }

}
