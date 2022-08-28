import { Component, Input, OnInit } from '@angular/core';
import { NsScheduleService } from '../../services/schedule.service';
import { NsSchedule } from '../../models/schedule';

@Component( {
    selector: 'ns-schedule-week',
    templateUrl: './week.component.html',
    styles: [ '.ns-schedule__header-wrap,.ns-schedule__timeline {grid-template-columns: [index] 3rem repeat(7, 1fr);}' ]
} )
export class WeekComponent implements OnInit
{
    @Input() schedules: NsSchedule[];

    public current: number;
    public first: number;
    public last: number;
    public days: number[];
    public hours: number[];

    constructor( private service: NsScheduleService )
    {
    }

    ngOnInit(): void
    {
        this.current = new Date().getDate();
        this.hours = Array( 24 ).fill( 0 ).map( ( x, y ) => x + y );
    }

    @Input()
    set currentDate( date: Date )
    {
        if ( date instanceof Date )
        {
            this.first = date.getDate() - date.getDay();
            this.last = this.first + 6;
            this.days = Array( 7 ).fill( this.first ).map( ( x, y ) => x + y );
            this.service.setCurrentDate( date );
        }
    }
}
