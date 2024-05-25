import { Component, ElementRef, forwardRef, Inject, Input, Optional, Renderer2, ViewChild } from '@angular/core';
import { NsFormControlValueAccessor } from '../form';
import { NsImage, NsImageCreate } from './models/image-upload';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NsImageUploadClient } from './interfaces/image-upload-client';
import { NS_IMAGE_UPLOAD } from './providers/image-setup';

@Component( {
    selector: 'ns-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: [ './image-upload.component.scss' ],
    providers: [ {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef( () => NsImageUploadComponent ),
        multi: true
    } ],
    host: {
        '[class.ns-image--loaded]': '!multi && !!value',
        '[class.ns-image--disabled]': 'disabled'
    }
} )
export class NsImageUploadComponent extends NsFormControlValueAccessor
{
    @Input() accept = '.jpg,.jpeg,.png,.webp';
    @Input() multi = false;
    @Input() limit = 5;

    @ViewChild( 'input', { static: false, read: ElementRef } ) imgRef: ElementRef<HTMLInputElement>;

    public loading: Set<string> = new Set<string>();
    private _fromIndex: number;
    private _toIndex: number;

    constructor( @Optional() @Inject( NS_IMAGE_UPLOAD ) private client: NsImageUploadClient,
                 private renderer: Renderer2 )
    {
        super();
    }

    override writeValue( value: NsImage )
    {
        if ( Array.isArray( value ) )
        {
            this._value = value.map( i => new NsImage( i ) );
        } else
        {
            this._value = ( this.multi && !value ) ? [] : value;
        }
    }

    onClick()
    {
        this.imgRef.nativeElement.click();
    }

    load()
    {
        const { files } = this.imgRef.nativeElement;
        if ( files.length )
        {
            this.add( new NsImageCreate( files.item( 0 ) ) );
            this.imgRef.nativeElement.value = null;
        }
    }

    add( image: NsImageCreate )
    {
        if ( this.client )
        {
            this.loading.add( image.name );
            this.client.upload( image ).subscribe( data =>
            {
                if ( this.multi )
                {
                    this.value = ( this.value || [] ).concat( data );
                } else
                {
                    this.value = data;
                }
                this.loading.delete( image.name );
            } );
        }
    }

    remove( image: NsImage )
    {
        this.loading.add( image.name );
        if ( this.client && !!image.id )
        {
            this.client.remove( image ).subscribe( () =>
            {
                if ( this.multi )
                {
                    this.value = ( this.value || [] ).filter( ( img: NsImage ) => img.id !== image.id );
                } else
                {
                    this.value = null;
                }
                this.loading.delete( image.name );
            } );
        } else
        {
            this.value = this.multi ? ( this.value || [] ).filter( img => img.id !== image.id ) : null;
            this.loading.delete( image.name );
        }
    }

    dragstart( event: DragEvent, index: number )
    {
        this.renderer.setStyle( event.target, 'opacity', .4 );
        event.dataTransfer.dropEffect = 'move';
        this._fromIndex = index;
    }

    dragover( event: DragEvent, index: number )
    {
        event.preventDefault();
        this._toIndex = index;
    }

    dragend( event: DragEvent )
    {
        this.renderer.setStyle( event.target, 'opacity', 1 );
    }

    drop( event: DragEvent )
    {
        event.stopPropagation();
        if ( this._fromIndex !== this._toIndex )
        {
            const element = this._value[ this._fromIndex ];
            this._value.splice( this._fromIndex, 1 );
            this._value.splice( this._toIndex, 0, element );
            this.onChange( this.value );
        }
    }
}
