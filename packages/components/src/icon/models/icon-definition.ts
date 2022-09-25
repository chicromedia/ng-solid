export class IconDefinition
{
    name: string;
    icon: string;

    constructor( props: IconDefinition )
    {
        Object.assign( this, props );
    }
}
