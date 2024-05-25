export class NsImageCreate
{
    public name: string;
    public type: string;
    public data: File | string;
    public size: number;
    public extension: string;

    constructor( file: File )
    {
        this.name = file.name;
        this.size = file.size;
        this.extension = file.name.match( /[^.]+$/ ).toString();
        this.type = file.type;
        this.data = file;
    }
}

export class NsImage<TIdentify = number>
{
    public id: TIdentify;
    public name: string;
    public type: string;
    public data: string;
    public size: number;
    public extension: string;

    constructor( props: Partial<NsImage> )
    {
        Object.assign( this, props );
    }
}
