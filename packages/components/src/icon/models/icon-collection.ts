import { IconDefinition } from './icon-definition';

export class IconCollection
{
    constructor( private items: Map<string, IconDefinition> )
    {
    }

    add( name: string, icon: IconDefinition ): void
    {
        this.items.set( name, icon );
    }

    get( name: string ): IconDefinition
    {
        return this.items.get( name );
    }

    remove( name: string ): void
    {
        this.items.delete( name );
    }
}
