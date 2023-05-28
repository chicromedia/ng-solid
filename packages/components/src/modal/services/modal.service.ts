import {
    ApplicationRef,
    ComponentFactoryResolver,
    ComponentRef,
    Inject,
    Injectable,
    Injector,
    NgModuleRef,
    RendererFactory2,
    Type
} from '@angular/core';
import { NsModalSetup } from '../interfaces/modal-setup';
import { NsModalWindow } from '../modal.component';
import { DOCUMENT } from '@angular/common';
import { NsModalRef } from '../models/modal-ref';
import { take } from 'rxjs/operators';


@Injectable( {
    providedIn: 'root'
} )
export class NsModalService
{
    private readonly modalStack: Set<ComponentRef<NsModalWindow>> = new Set<ComponentRef<NsModalWindow>>();

    constructor( private appRef: ApplicationRef,
                 private injector: Injector,
                 private resolver: ComponentFactoryResolver,
                 private ngModuleRef: NgModuleRef<any>,
                 private rendererFactory: RendererFactory2,
                 @Inject( DOCUMENT ) private document: any )
    {
    }

    open<T = any>( setup: NsModalSetup<T> ): NsModalRef<T>
    {
        const renderer = this.rendererFactory.createRenderer( null, null );
        const windowRef = this.attachComponent( this.document.body, NsModalWindow );
        const factory = this.resolver.resolveComponentFactory( setup.component );
        const contentRef = windowRef.instance.contentRef.createComponent( factory );

        renderer.addClass( this.document.body, 'ns-modal__open' );
        this.registerWindow( windowRef );

        const nsModalRef = new NsModalRef<T>( {
            windowRef,
            contentRef
        } );

        nsModalRef.hidden.pipe( take( 1 ) ).subscribe( () =>
        {
            this.modalStack.delete( nsModalRef.windowRef );
            if ( !this.modalStack.size )
            {
                renderer.removeClass( this.document.body, 'ns-modal__open' );
            }
        } );

        windowRef.instance.title = setup.title;
        windowRef.instance.close = nsModalRef.close.bind( nsModalRef );
        windowRef.instance.size = setup.size;
        return nsModalRef;
    }

    close()
    {
        this.modalStack.forEach( ( { instance } ) => instance.close() );
    }

    private attachComponent<T = any>( container: Element, type: Type<T> )
    {
        const factory = this.resolver.resolveComponentFactory( type );
        const componentRef = factory.create( this.injector, null, null, this.ngModuleRef );
        this.appRef.attachView( componentRef.hostView );
        container.appendChild( componentRef.location.nativeElement );
        return componentRef;
    }

    private registerWindow( nsWindow: ComponentRef<NsModalWindow> )
    {
        this.modalStack.add( nsWindow );
        nsWindow.onDestroy( () =>
        {
            if ( this.modalStack.has( nsWindow ) )
            {
                this.modalStack.delete( nsWindow );
            }
        } );
    }


}
