import { Component, Input, OnInit } from '@angular/core';
import { NsScheduleService } from '../../services/schedule.service';
import { NsSchedule } from '../../models/schedule';

@Component( {
    selector: 'ns-schedule-day',
    templateUrl: './day.component.html',
    styles: [ '.ns-schedule__header-wrap,.ns-schedule__timeline {grid-template-columns: [index] 3rem [timeline] 1fr;}' ]
} )
export class DayComponent implements OnInit
{

    @Input() schedules: NsSchedule[];

    public current: number;
    public first: number;
    public days: number[];
    public hours: number[];

    constructor( private service: NsScheduleService )
    {
    }

    ngOnInit(): void
    {
        this.hours = Array( 24 ).fill( 0 ).map( ( x, y ) => x + y );
    }

    @Input()
    set currentDate( date: Date )
    {
        if ( date instanceof Date )
        {
            this.current = date.getDate();
            this.first = date.getDate() - date.getDay();
            this.days = Array( 7 ).fill( this.first ).map( ( x, y ) => x + y );
            this.service.setCurrentDate( date );
        }
    }

}
