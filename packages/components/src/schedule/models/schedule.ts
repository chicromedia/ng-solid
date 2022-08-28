export class NsSchedule
{
    public id: number;
    public subject: string;
    public body: string;
    public startTime: string;
    public endTime: string;
    public created: string;
    public updated: string;

    constructor( props: Partial<NsSchedule> = {} )
    {
        Object.assign( this, props );
    }
}
