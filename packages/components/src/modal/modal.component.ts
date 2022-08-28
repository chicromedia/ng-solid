import { Component, HostListener, Input, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';

@Component( {
    selector: 'ns-modal-window',
    templateUrl: './modal.component.html',
    styleUrls: [ './modal.component.scss' ],
    host: {
        '[class.ns-modal]': 'true'
    },
    encapsulation: ViewEncapsulation.None,
} )
export class NsModalWindow implements OnInit
{

    @Input() title: string;
    @Input() size: 'lg' | 'sm' | 'xl';

    close: () => void;

    @ViewChild( 'content', { read: ViewContainerRef, static: true } ) contentRef: ViewContainerRef;
    @ViewChild( 'footer', { read: ViewContainerRef, static: true } ) footerRef: ViewContainerRef;

    constructor()
    {
    }

    ngOnInit(): void
    {
    }

    @HostListener( 'window:keydown', [ '$event' ] )
    keydown( event: KeyboardEvent )
    {
        if ( event.key == 'Escape' )
        {
            this.close();
        }
    }
}
