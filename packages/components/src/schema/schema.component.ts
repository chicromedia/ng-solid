import { Component, HostBinding, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NsSchemaMarkup } from './models/schema';

@Component( {
    selector: 'ns-schema',
    template: ''
} )
export class NsSchemaMarkupComponent implements OnInit, OnChanges
{
    @Input()
    data: Partial<NsSchemaMarkup>;

    @HostBinding( 'innerHTML' ) innerHTML: SafeHtml;

    constructor( @Inject( DomSanitizer ) private sanitizer: DomSanitizer )
    {
    }

    ngOnInit()
    {
    }

    ngOnChanges( { data }: SimpleChanges )
    {
        const json = { '@context': 'https://schema.org', ...data.currentValue };
        const template = `<script type="application/ld+json">${ JSON.stringify( json, null, 2 ) }</script>`;
        this.innerHTML = this.sanitizer.bypassSecurityTrustHtml( template );
    }
}
