import { AfterViewInit, Directive, OnDestroy, SkipSelf, TemplateRef } from '@angular/core';
import { NsModalWindow } from '../modal.component';

@Directive( {
    selector: '[nsModalFooter]'
} )
export class NsModalFooter implements AfterViewInit, OnDestroy
{
    constructor( @SkipSelf() private modal: NsModalWindow,
                 private templateRef: TemplateRef<NsModalFooter> )
    {
    }

    ngAfterViewInit()
    {
        if ( this.modal.footerRef )
        {
            this.modal.footerRef.createEmbeddedView( this.templateRef );
        }
    }

    ngOnDestroy()
    {
        if ( this.modal.footerRef )
        {
            this.modal.footerRef.clear();
        }
    }

}
