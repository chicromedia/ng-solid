import { Inject, Injectable, Optional } from '@angular/core';
import { NS_ICONS } from '../providers/constants';
import { NsIconDefinition } from '../interfaces/icon-definition';

@Injectable( {
    providedIn: 'root'
} )
export class NsIconsService
{

    private readonly cache: Map<string, string> = new Map<string, string>();

    constructor( @Optional() @Inject( NS_ICONS ) icons: NsIconDefinition[] )
    {
        this.addIcon( ...( icons || [] ) );
    }

    get( name: string )
    {
        return this.cache.get( name );
    }

    addIcon( ...icons: NsIconDefinition[] )
    {
        icons.forEach( icon => this.cache.set( icon.name, icon.icon ) );
    }
}
