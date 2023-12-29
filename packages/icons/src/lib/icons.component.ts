import { Component, ElementRef, Input, OnChanges, Optional, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { NsIconsService } from './services/icons.service';
import { NsIconsPatchService } from './services/icons-patch.service';

@Component( {
    selector: 'ns-icon',
    template: `
        <svg xmlns="http://www.w3.org/2000/svg"
             [attr.fill]="color"
             [attr.width]="size"
             [attr.height]="size"
             [attr.stroke-width]="strokeWidth"
             [attr.viewBox]="viewBox"
             #content>
        </svg>
    `,
    styles: [ ':host.ns-icon{display: inline-flex}' ],
    host: {
        '[class.ns-icon]': 'true',
        '[style.--ns-icon-color]': 'color'
    }
} )
export class IconsComponent implements OnChanges
{
    @Input() name: string;
    @Input() color: string = 'currentColor';
    @Input() size: number = 24;
    @Input() strokeWidth = 1;
    @Input() viewBox: string = '0 0 30 30';

    @ViewChild( 'content', { read: ElementRef, static: true } ) container: ElementRef<HTMLOrSVGElement>;

    constructor( private renderer: Renderer2,
                 private service: NsIconsService)
    {
    }

    ngOnChanges( { name }: SimpleChanges )
    {
        if ( name )
        {
            this.renderBy( name.currentValue );
            this.renderer.removeClass( this.container.nativeElement, `ns-icon-${ name.previousValue }` );
        }
    }

    private renderBy( name: string )
    {
        const path = this.service.get( name );
        if ( path )
        {
            this.renderer.addClass( this.container.nativeElement, `ns-icon-${ name }` );
            this.renderer.setProperty( this.container.nativeElement, 'innerHTML', path );
        } else
        {
            console.warn( `The icon [${ name }] was not found, try to register it in the .forRoot or .forFeature of NsIconsModule` );
        }
    }

}
