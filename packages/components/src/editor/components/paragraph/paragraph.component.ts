import { Component, OnInit } from '@angular/core';
import { Guid } from '@ng-solid/core';
import { NsEditorService } from '../../services/editor.service';

@Component( {
    selector: 'ns-editor-paragraph',
    templateUrl: './paragraph.component.html',
    styleUrls: [ './paragraph.component.scss' ]
} )
export class NsEditorParagraphComponent implements OnInit
{
    public id: string = Guid.create();

    private _value: string = 'p';

    constructor( private editor: NsEditorService )
    {
    }

    ngOnInit(): void
    {
    }

    set value( heading )
    {
        this.editor.formatBlock( heading );
    }

    get value()
    {
        return this._value;
    }
}
