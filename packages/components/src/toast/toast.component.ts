import { Component, ElementRef, HostBinding, Input } from '@angular/core';
import { TOAST_ANIMATION } from './animations/toast-transition';
import { ToastType } from './enums/toast-type';

@Component( {
    selector: 'ns-toast',
    template: `
        <span class="ns-toast__message" [innerHTML]="message"></span>
        <ns-icon [name]="iconName" [size]="24"></ns-icon>
    `,
    styleUrls: [ './toast.component.scss' ],
    animations: [ TOAST_ANIMATION ],
    host: {
        '[class.ns-toast]': 'true',
        '[class.ns-toast--success]': 'type ===\'success\'',
        '[class.ns-toast--warning]': 'type ===\'warning\'',
        '[class.ns-toast--info]': 'type ===\'info\'',
        '[class.ns-toast--error]': 'type ===\'error\'',
        '[style.margin-left.px]': 'marginLeft'
    }
} )
export class NsToastComponent
{
    @Input()
    type: ToastType = ToastType.SUCCESS;
    @Input()
    message: string;

    @HostBinding( '@translate' )
    state: 'display' | 'destroy' = 'display';

    constructor( private readonly element: ElementRef<HTMLElement> )
    {
    }

    get marginLeft()
    {
        return -( this.element.nativeElement.offsetWidth / 2 );
    }

    get iconName()
    {
        switch ( this.type )
        {
            case ToastType.WARNING:
                return 'exclamation-triangle';
            case ToastType.ERROR:
                return 'exclamation-circle';
            case ToastType.INFO:
                return 'info-circle';
            default:
                return 'check-circle';
        }
    }
}
