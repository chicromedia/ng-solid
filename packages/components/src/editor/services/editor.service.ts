import { Labels } from '../models/labels';
import { NsEditorSetup } from '../interfaces/editor-config';
import { Commands } from '../enums/commands.enum';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export const NS_EDITOR_SETUP_TOKEN = new InjectionToken<NsEditorSetup>( 'NsEditorSetup' );

@Injectable( {
    providedIn: 'root'
} )
export class NsEditorService
{
    private savedSelection: Range | null;
    private selectedText: string;
    private readonly labels: Labels;

    constructor( @Inject( NS_EDITOR_SETUP_TOKEN ) @Optional() private config: NsEditorSetup,
                 @Inject( DOCUMENT ) private doc: any )
    {
        this.labels = new Labels( config ? config.labels : {} );
    }

    translate( key: string ): string
    {
        return this.labels.get( key );
    }

    saveSelection()
    {
        switch ( true )
        {
            case !!this.doc.getSelection:
                const sel = this.doc.getSelection();
                if ( sel.getRangeAt && sel.rangeCount )
                {
                    this.savedSelection = sel.getRangeAt( 0 );
                    this.selectedText = sel.toString();
                }
                break;
            case !!this.doc.getSelection && !!this.doc.createRange :
                this.savedSelection = document.createRange();
                break;
            default:
                this.savedSelection = null;
        }
    };

    command( name: Commands, value?: any )
    {
        this.doc.execCommand( name, false, value );
    }

    formatBlock( heading: string )
    {
        const headings = [ 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre' ];
        if ( headings.includes( heading ) )
        {
            this.doc.execCommand( Commands.FORMAT_BLOCK, false, heading );
        }
    }

    createLink( link: { text: string, url: string, tooltip: string, openNewWindow: boolean } )
    {
        const newUrl = `<a href="${ link.url }" title="${ link.tooltip }" target="${ link.openNewWindow ? '_blank' : '_self' }">${ link.text }</a>`;
        this.insertHtml( newUrl );
    }

    insertHtml( html: string ): void
    {
        const isHTMLInserted = this.doc.execCommand( Commands.INSERT_HTML, false, html );
        if ( !isHTMLInserted )
        {
            throw new Error( 'Unable to perform the operation' );
        }
    }
}

export const nsEditorSetupFactory = ( config: NsEditorSetup, document: Document ): NsEditorService =>
{
    return new NsEditorService( config ?? { labels: {} }, document );
};
