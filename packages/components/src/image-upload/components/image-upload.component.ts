import { Component, ElementRef, forwardRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControlValueAccessor } from '../../form/models/form-control-value-accessor';
import { ImageUpload } from '../models/image-upload';
import { NG_VALIDATORS } from '@angular/forms';

@Component( {
    selector: 'ns-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: [ './image-upload.component.scss' ],
    providers: [ {
        provide: NG_VALIDATORS,
        useExisting: forwardRef( () => NsImageUploadComponent ),
        multi: true
    } ],
    host: {
        '[class.ns-image-loaded]': '!multi && !!value'
    }
} )
export class NsImageUploadComponent extends FormControlValueAccessor implements OnInit
{

    @Input() accept: string = '.jpg,.jpeg,.png,.webp';
    @Input() multi: boolean = false;
    @Input() limit: number = 5;

    @ViewChild( 'input', { static: false, read: ElementRef } ) imgRef: ElementRef<HTMLInputElement>;

    selected: number[] = [];
    private fromIndex: number;
    private toIndex: number;

    constructor( private renderer: Renderer2 )
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
            this._value = value.map( i => new ImageUpload( i ) );
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
                const extension = name.match( /[^.]+$/ ).toString();
                this.add( new ImageUpload( { name, type, size, data, extension } ) );
            };
        }
    }

    add( image: ImageUpload )
    {
        this.value = this.multi ? ( this.value || [] ).concat( image ) : image;
    }

    select( target: EventTarget, index: number )
    {
        this.selected = ( target as HTMLInputElement ).checked
            ? this.selected.concat( index )
            : this.selected.filter( i => i !== index );
    }

    dragstart( event: DragEvent, index: number )
    {
        this.renderer.setStyle( event.target, 'opacity', .4 );
        event.dataTransfer.dropEffect = 'move';
        this.fromIndex = index;
    }

    dragover( event: DragEvent, index: number )
    {
        event.preventDefault();
        this.toIndex = index;
    }

    dragend( event: DragEvent )
    {
        this.renderer.setStyle( event.target, 'opacity', 1 );
    }

    drop( event: DragEvent )
    {
        event.stopPropagation();
        if ( this.fromIndex !== this.toIndex )
        {
            const element = this._value[ this.fromIndex ];
            this._value.splice( this.fromIndex, 1 );
            this._value.splice( this.toIndex, 0, element );
            this.onChange( this.value );
        }
    }

    removeAll()
    {
        this.value = this.value.filter( ( item, i ) => !this.selected.includes( i ) );
        this.selected = [];
    }
}
