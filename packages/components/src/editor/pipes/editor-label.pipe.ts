import { Pipe, PipeTransform } from '@angular/core';
import { NsEditorService } from '../services/editor.service';

@Pipe( {
    name: 'ns_editor_label'
} )
export class NsEditorLabelPipe implements PipeTransform
{

    constructor( private editor: NsEditorService )
    {
    }

    transform( key: string ): string
    {
        return this.editor.translate( key );
    }

}
