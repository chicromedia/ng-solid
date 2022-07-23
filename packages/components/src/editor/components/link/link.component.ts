import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NsEditorService } from '../../services/editor.service';

@Component( {
    selector: 'ns-editor-link',
    templateUrl: './link.component.html',
    styleUrls: [ './link.component.scss' ]
} )
export class NsEditorLinkComponent implements OnInit
{

    public formLink: FormGroup;
    public show: boolean;

    constructor( private fb: FormBuilder, private editor: NsEditorService )
    {
    }

    ngOnInit(): void
    {
        this.formLink = this.fb.group( {
            text: [ '', Validators.required ],
            url: [ '', Validators.required ],
            tooltip: [ '' ],
            openNewWindow: [ true ]
        } );
    }

    insert()
    {
        if ( this.formLink.valid )
        {
            this.editor.createLink( this.formLink.getRawValue() );
            this.formLink.reset();
            this.show = false;
        }
    }
}
