export class NsImageUpload
{
    public id: number;
    public name: string;
    public type: string;
    public data: string;
    public size: number;
    public extension: string;

    constructor( props: Partial<NsImageUpload> = {} )
    {
        Object.assign( this, props );
    }
}
