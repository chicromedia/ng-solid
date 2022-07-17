import { Component, HostListener, Input, OnInit, Output } from '@angular/core';
import { NS_BUTTON_STYLES_HOST } from '../../providers/btn.provider';
import { NsFacebookService } from '../../services/facebook.service';
import { Subject } from 'rxjs';

@Component( {
    selector: 'ns-facebook-share',
    templateUrl: './share.component.html',
    styleUrls: [ './share.component.scss' ],
    host: NS_BUTTON_STYLES_HOST
} )
export class NsFacebookShareComponent implements OnInit
{

    @Input()
    size: fb.FacebookButtonSize = 'large';
    @Input()
    layout: 'default' | 'rounded' = 'default';
    @Input()
    rounded: boolean;
    @Input()
    disabled: boolean = true;
    @Input()
    href: string;
    @Input()
    hashtag: string;
    @Output()
    onShared: Subject<fb.ShareDialogResponse> = new Subject<fb.ShareDialogResponse>();

    constructor( private facebook: NsFacebookService )
    {
    }

    ngOnInit(): void
    {
    }

    @HostListener( 'click', [ '$event' ] )
    shared( event: MouseEvent )
    {
        this.facebook.share( { href: this.href, hashtag: this.hashtag } ).subscribe(
            response => this.onShared.next( response )
        );
    }

}
