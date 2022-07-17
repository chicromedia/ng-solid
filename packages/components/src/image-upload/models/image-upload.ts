export class ImageUpload
{
    public id: number;
    public name: string;
    public type: string;
    public data: string;
    public size: number;
    public extension: string;

    constructor( props: Partial<ImageUpload> = {} )
    {
        Object.assign( this, props );
    }
}
