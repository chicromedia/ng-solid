import { Component, Input, OnInit } from '@angular/core';
import { Commands } from '../../enums/commands.enum';
import { NsEditorService } from '../../services/editor.service';

@Component( {
    selector: 'ns-editor-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: [ './color-picker.component.scss' ]
} )
export class NsEditorColorPickerComponent implements OnInit
{
    @Input() presets: string[][];
    @Input() type: 'text_color' | 'background_color' = 'text_color';

    showPopup: boolean;
    activeColor: any;
    isActive: boolean;

    trackByIndex = index => index;

    constructor( private editor: NsEditorService )
    {
    }

    ngOnInit(): void
    {
    }

    private get command(): Commands
    {
        return this.type === 'text_color' ? Commands.TEXT_COLOR : Commands.BACKGROUND_COLOR;
    }

    toggle()
    {
        this.showPopup = !this.showPopup;
    }

    getContrastYIQ( hexadecimal: string ): string
    {
        const color = hexadecimal.replace( '#', '' );
        const r = parseInt( color.substring( 0, 2 ), 16 );
        const g = parseInt( color.substring( 2, 4 ), 16 );
        const b = parseInt( color.substring( 4, 6 ), 16 );
        const yiq = ( ( r * 299 ) + ( g * 587 ) + ( b * 114 ) ) / 1000;
        return yiq >= 128 ? 'black' : 'white';
    }

    onColorSelect( color: string ): void
    {
        this.editor.command( this.command, this.activeColor = color );
        this.toggle();
    }

    remove()
    {

    }


}
