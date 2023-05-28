import { Component, ElementRef, forwardRef, Inject, Input, OnInit, Optional, Renderer2, ViewChild } from '@angular/core';
import { NsFormControlValueAccessor } from '../form/models/form-control-value-accessor';
import { NsImageUpload } from './models/image-upload';
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
export class NsImageUploadComponent extends NsFormControlValueAccessor implements OnInit
{

    @Input() accept: string = '.jpg,.jpeg,.png,.webp';
    @Input() multi: boolean = false;
    @Input() limit: number = 5;

    @ViewChild( 'input', { static: false, read: ElementRef } ) imgRef: ElementRef<HTMLInputElement>;

    public loading: Set<string> = new Set<string>();
    private _fromIndex: number;
    private _toIndex: number;

    constructor( @Optional() @Inject( NS_IMAGE_UPLOAD ) private client: NsImageUploadClient,
                 private renderer: Renderer2 )
    {
        super();
    }

    ngOnInit()
    {
    }

    writeValue( value: any )
    {
        if ( Array.isArray( value ) )
        {
            this._value = value.map( i => new NsImageUpload( i ) );
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
            const reader = new FileReader();
            const imageFile: File = files.item( 0 );
            reader.readAsDataURL( imageFile );
            reader.onload = () =>
            {
                const { name, type, size } = imageFile;
                const result = reader.result.toString();
                const data = result.split( ',' )[ 1 ];
                if ( ( !Array.isArray( this.value ) && data !== this.value.data ) || !this.value.some( i => i.data === data ) )
                {
                    const extension = name.match( /[^.]+$/ ).toString();
                    this.add( new NsImageUpload( { name, mimeType: type, size, data, extension } ) );
                    this.imgRef.nativeElement.value = null;
                }
            };
        }
    }

    add( image: NsImageUpload )
    {
        this.loading.add( image.name );
        this._value = this.multi ? ( this.value || [] ).concat( image ) : image;
        if ( this.client )
        {
            this.client.upload( image ).subscribe( data =>
            {
                this.value = this.multi ? ( this.value || [] ).map( img => img.name == data.name ? data : img ) : data;
                this.loading.delete( image.name );
            } );
        } else
        {
            this.loading.delete( image.name );
        }
    }

    remove( image: NsImageUpload )
    {
        this.loading.add( image.name );
        if ( this.client && !!image.guid )
        {
            this.client.remove( image ).subscribe( () =>
            {
                this.value = this.multi ? ( this.value || [] ).filter( img => img.name !== image.name ) : null;
                this.loading.delete( image.name );
            } );
        } else
        {
            this.value = this.multi ? ( this.value || [] ).filter( img => img.name !== image.name ) : null;
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
