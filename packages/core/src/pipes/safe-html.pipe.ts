import { Inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe( {
    name: 'nsSafeHtml'
} )
export class NsSafeHtmlPipe implements PipeTransform
{
    constructor( @Inject( DomSanitizer ) private sanitizer: DomSanitizer ) {}

    transform( value: string ): SafeHtml
    {
        return value ? this.sanitizer.bypassSecurityTrustHtml( value ) : "";
    }

}
