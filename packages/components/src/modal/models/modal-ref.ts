import { ComponentRef } from '@angular/core';
import { NsModalWindow } from '../modal.component';
import { Subject } from 'rxjs';

export class NsModalRef<T = any>
{
    windowRef: ComponentRef<NsModalWindow>;
    contentRef: ComponentRef<T>;
    readonly hidden: Subject<void> = new Subject<void>();

    constructor( props: Partial<NsModalRef<T>> = {} )
    {
        Object.assign( this, props );
    }

    get instance()
    {
        return this.contentRef!.instance;
    }

    close()
    {
        const { nativeElement } = this.windowRef.location;
        nativeElement.parentNode.removeChild( nativeElement );
        this.hidden.next();
        this.windowRef.destroy();

        if ( this.contentRef )
        {
            this.contentRef.destroy();
        }

        this.windowRef = <any> null;
        this.contentRef = <any> null;
    }
}
