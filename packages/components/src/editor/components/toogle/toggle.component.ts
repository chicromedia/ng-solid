import { Component, OnInit } from '@angular/core';
import { Commands } from '../../enums/commands.enum';
import { NsEditorService } from '../../services/editor.service';

@Component( {
    selector: 'ns-editor-toggle',
    templateUrl: './toggle.component.html',
    styleUrls: [ './toggle.component.scss' ]
} )
export class NsEditorToggleCommandComponent implements OnInit
{

    public commands = Commands;

    constructor( private editor: NsEditorService )
    {
    }

    ngOnInit(): void
    {
    }

    command( name: Commands )
    {
        this.editor.command( name );
    }
}
