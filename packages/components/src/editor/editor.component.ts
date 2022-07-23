import { Component, ElementRef, forwardRef, HostListener, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControlValueAccessor } from '../form/models/form-control-value-accessor';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NsFormContentEditableComponent } from '../form/components/content-editable/content-editable.directive';
import { NsEditorService } from './services/editor.service';

const DEFAULT_COLOR_PRESETS = [
    '#b60205',
    '#d93f0b',
    '#fbca04',
    '#0e8a16',
    '#006b75',
    '#1d76db',
    '#0052cc',
    '#5319e7',
    '#e99695',
    '#f9d0c4',
    '#fef2c0',
    '#c2e0c6',
    '#bfdadc',
    '#c5def5',
    '#bfd4f2',
    '#d4c5f9',
];

@Component( {
    selector: 'ns-editor',
    templateUrl: './editor.component.html',
    styleUrls: [ './editor.component.scss' ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef( () => NsEditorComponent ),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.ns-editor__disabled]': 'disabled'
    }
} )
export class NsEditorComponent extends FormControlValueAccessor<string> implements OnInit, OnDestroy
{

    @Input()
    rows: number = 3;
    @Input()
    maxLength: number;
    @Input()
    colorPresets: string[] = DEFAULT_COLOR_PRESETS;

    @ViewChild( NsFormContentEditableComponent, { read: ElementRef, static: true } ) textArea: ElementRef<HTMLElement>;

    @HostListener( 'click' )
    focused = () => this.textArea.nativeElement.focus();

    constructor( private editor: NsEditorService )
    {
        super();
    }

    ngOnInit(): void
    {
    }

    get presets(): string[][]
    {
        const col = 8;
        const colors: string[][] = [];

        this.colorPresets.forEach( ( color, index ) =>
        {
            const row = Math.floor( index / col );
            if ( !colors[ row ] )
            {
                colors.push( [] );
            }
            colors[ row ].push( color );
        } );

        return colors;
    }

    blur(): void
    {
        this.editor.saveSelection();
        this.onTouched();
    }

    ngOnDestroy()
    {
    }
}
