import { ApplicationRef, ComponentRef, createComponent, Inject, Injectable, Type } from '@angular/core';
import { NsToastComponent } from '../toast.component';
import { ToastSetup } from '../interfaces/toast-setup';
import { ToastRef } from '../interfaces/toast-ref';
import { DOCUMENT } from '@angular/common';

@Injectable( { providedIn: 'root' } )
export class NsToastService
{
    private readonly stack: Set<ComponentRef<NsToastComponent>> = new Set<
        ComponentRef<NsToastComponent>
    >();

    constructor( private readonly appRef: ApplicationRef,
                 @Inject( DOCUMENT ) private readonly document: Document )
    {
    }

    public add( setup: ToastSetup ): ToastRef
    {
        const parent: HTMLElement = setup.parent
            ? this.document.querySelector( setup.parent )!
            : this.document.body;
        const componentRef = this.attachComponent( parent, NsToastComponent );
        this.registerToast( componentRef );

        const toastRef = new ToastRef( {
            ref: componentRef
        } );

        toastRef.timeout.subscribe( () =>
        {
            toastRef.destroy( 500 ).subscribe( () =>
            {
                if ( typeof setup.callback === 'function' )
                {
                    setup.callback();
                }
            } );
        } );

        Object.assign( componentRef.instance, setup );
        return toastRef;
    }

    private attachComponent<T = any>( container: Element, type: Type<T> )
    {
        const componentRef = createComponent( type, {
            environmentInjector: this.appRef.injector
        } );
        this.appRef.attachView( componentRef.hostView );
        container.appendChild( componentRef.location.nativeElement );
        return componentRef;
    }

    private registerToast( toast: ComponentRef<NsToastComponent> )
    {
        this.stack.add( toast );
        toast.onDestroy( () =>
        {
            if ( this.stack.has( toast ) )
            {
                this.stack.delete( toast );
            }
        } );
    }
}
