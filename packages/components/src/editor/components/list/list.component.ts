import { Component, OnInit } from '@angular/core';
import { Commands } from '../../enums/commands.enum';
import { NsEditorService } from '../../services/editor.service';

@Component( {
    selector: 'ns-editor-list',
    templateUrl: './list.component.html',
    styleUrls: [ './list.component.css' ]
} )
export class NsEditorListComponent implements OnInit
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
