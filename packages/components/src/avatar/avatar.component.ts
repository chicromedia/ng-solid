import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Inject,
    Input,
    NgZone,
    OnChanges,
    PLATFORM_ID,
    Renderer2,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component( {
    selector: 'ns-avatar',
    template: `
        <ng-container *ngIf="icon && hasIcon">
            <ns-icon [name]="icon"/>
        </ng-container>

        <ng-container *ngIf="src && hasSrc">
            <img class="ns-avatar__image" [src]="src" [attr.alt]="atl" (error)="imgError($event)"/>
        </ng-container>

        <ng-container *ngIf="text && hasText">
            <span class="ns-avatar__text" #textRef>{{text}}</span>
        </ng-container>
    `,
    styleUrls: [ './avatar.component.scss' ],
    host: {
        class: 'ns-avatar',
        '[class.ns-avatar__circle]': `shape === 'circle'`,
        '[class.ns-avatar__square]': `shape === 'square'`,
        '[style.width]': 'customSize',
        '[style.height]': 'customSize',
        '[style.line-height]': 'customSize',
        '[style.font-size.px]': '(hasIcon && customSize) ? $any(size) / 2 : null'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
} )
export class NsAvatarComponent implements OnChanges
{

    @Input() text?: string;
    @Input() src?: string;
    @Input() atl?: string;
    @Input() icon?: string;
    @Input() shape: 'circle' | 'square' = 'circle';
    @Input() size: 'large' | 'small' | number = 'small';
    @Input() gap: number = 4;


    @ViewChild( 'textRef', { static: false } ) textRef?: ElementRef<HTMLSpanElement>;

    public customSize: string | null = null;

    public hasText: boolean;
    public hasIcon: boolean;
    public hasSrc: boolean;

    constructor( private elementRef: ElementRef,
                 private cdr: ChangeDetectorRef,
                 @Inject( PLATFORM_ID ) private platformId: string,
                 private renderer: Renderer2,
                 private ngZone: NgZone )
    {
    }

    ngOnChanges()
    {
        this.hasText = !this.src && !!this.text;
        this.hasIcon = !this.src && !!this.icon;
        this.hasSrc = !!this.src;

        this.setSizeStyle();
        this.notifyCalc();
    }

    private calcStringSize()
    {
        if ( !this.hasText )
        {
            return;
        }

        const textEl = this.textRef!.nativeElement;
        const childrenWidth = textEl.offsetWidth;
        const avatarWidth = this.elementRef.nativeElement.getBoundingClientRect().width;
        const offset = this.gap * 2 < avatarWidth ? this.gap * 2 : 8;
        const scale = avatarWidth - offset < childrenWidth ? ( avatarWidth - offset ) / childrenWidth : 1;

        this.renderer.setStyle( textEl, 'transform', `scale(${ scale }) translateX(-50%)` );
        this.renderer.setStyle( textEl, 'line-height', this.customSize || '' );
    }

    imgError( $event: ErrorEvent )
    {
        if ( !$event.defaultPrevented )
        {
            this.hasSrc = false;
            this.hasIcon = false;
            this.hasText = false;
            if ( this.icon )
            {
                this.hasIcon = true;
            } else if ( this.text )
            {
                this.hasText = true;
            }
            this.cdr.detectChanges();
            this.setSizeStyle();
            this.notifyCalc();
        }
    }

    private notifyCalc(): void
    {
        if ( isPlatformBrowser( this.platformId ) )
        {
            this.ngZone.runOutsideAngular( () =>
                setTimeout( () =>
                    this.calcStringSize()
                )
            );
        }
    }

    private setSizeStyle(): void
    {
        if ( typeof this.size === 'number' )
        {
            this.customSize = `${ this.size }px`;
        } else
        {
            this.customSize = null;
        }
        this.cdr.markForCheck();
    }
}
