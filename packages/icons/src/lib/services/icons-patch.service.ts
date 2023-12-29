import { Inject, Injectable, Optional, Self } from '@angular/core';
import { NsIconDefinition } from '../interfaces/icon-definition';
import { NS_ICONS_PATCH } from '../providers/constants';
import { NsIconsService } from './icons.service';

@Injectable( {
    providedIn: 'any'
} )
export class NsIconsPatchService
{
    patched = false;

    constructor( @Optional() @Self() @Inject( NS_ICONS_PATCH ) private readonly extraIcons: NsIconDefinition[],
                 private readonly service: NsIconsService
    )
    {
        if ( this.extraIcons )
        {
            this.doPatch();
        }
    }

    doPatch(): void
    {
        if ( this.patched )
        {
            return;
        }

        this.service.addIcon( ...this.extraIcons );
        this.patched = true;
    }
}
