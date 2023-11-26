import { ComponentRef } from '@angular/core';
import { Observable, take, tap, timer } from 'rxjs';
import { NsToastComponent } from '../toast.component';

export class ToastRef
{
    ref: ComponentRef<NsToastComponent>;
    readonly timeout: Observable<any>;

    constructor( props: Partial<ToastRef> = {} )
    {
        Object.assign( this, props );
        this.timeout = timer( 5000 ).pipe( take( 1 ) );
    }

    get instance()
    {
        return this.ref?.instance;
    }

    destroy( timeout: number )
    {
        this.ref.instance.state = 'destroy';
        this.ref.changeDetectorRef.detectChanges();

        return timer( timeout ).pipe(
            take( 1 ),
            tap( () =>
            {
                const { nativeElement } = this.ref.location;
                nativeElement.parentNode.removeChild( nativeElement );

                if ( this.ref )
                {
                    this.ref.destroy();
                }
                this.ref = null!;
            } )
        );
    }
}
