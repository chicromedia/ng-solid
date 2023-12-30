import { Inject, Injectable, Self } from '@angular/core';
import { NsIconDefinition } from '../interfaces/icon-definition';
import { NS_ICONS_PATCH } from '../providers/constants';
import { NsIconsService } from './icons.service';

@Injectable()
export class NsIconsPatchService
{
    patched = false;

    constructor( @Self() @Inject( NS_ICONS_PATCH ) private readonly extraIcons: NsIconDefinition[],
                 private readonly service: NsIconsService
    )
    {
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
