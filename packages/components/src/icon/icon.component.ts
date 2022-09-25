import {
    Component,
    ElementRef,
    Inject,
    InjectionToken,
    Input,
    OnChanges,
    Renderer2,
    SimpleChanges,
    SkipSelf,
    ViewChild
} from '@angular/core';
import { IconCollection } from './models/icon-collection';
import { IconKeys } from './icons';

export const NS_ICONS = new InjectionToken( 'ns_icons' );

@Component( {
    selector: 'ns-icon',
    templateUrl: './icon.component.html',
    styles: [ ':host{display: flex; justify-content: center; align-content: center}' ],
    host: {
        '[class.ns-icon]': 'true'
    },
} )
export class NsIconComponent implements OnChanges
{
    @Input()
    name: IconKeys;
    @Input()
    color: string = 'currentColor';
    @Input()
    size: number = 24;

    @ViewChild( 'content', { read: ElementRef, static: true } ) element: ElementRef<HTMLOrSVGElement>;

    constructor( @SkipSelf() @Inject( NS_ICONS ) private icons: IconCollection,
                 private renderer: Renderer2 )
    {
    }

    ngOnChanges( { name }: SimpleChanges )
    {
        if ( name && name.currentValue )
        {
            const { icon } = this.icons.get( name.currentValue );
            this.renderer.setProperty( this.element.nativeElement, 'innerHTML', icon );
        }
    }

}
