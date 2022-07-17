import { Component, ElementRef, forwardRef, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormControlValueAccessor } from '../../form/models/form-control-value-accessor';
import { ImageUpload } from '../models/image-upload';
import { NG_VALIDATORS } from '@angular/forms';
import { Subject } from 'rxjs';

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

    @Output()
    selected: Subject<number[]> = new Subject<number[]>();

    private _selected: number[] = [];
    private _fromIndex: number;
    private _toIndex: number;

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
        this._selected = ( target as HTMLInputElement ).checked
            ? this._selected.concat( index )
            : this._selected.filter( i => i !== index );
        this.selected.next( this._selected );
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
