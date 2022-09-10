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

    public currentDay: number;
    public first: number;
    public last: number;
    public days: number[];
    public hours: number[];

    private DAYS_OF_WEEK: number = 7;

    constructor( private service: NsScheduleService )
    {
    }

    ngOnInit(): void
    {
        this.currentDay = new Date().getDate();
        this.hours = Array( 24 ).fill( 0 ).map( ( x, y ) => x + y );
    }

    @Input()
    set currentDate( date: Date )
    {
        if ( date instanceof Date )
        {
            this.first = date.getDate() - date.getDay();
            this.last = this.first + 6;
            this.service.setCurrentDate( date );
            let lastDayOfPrevMonth = new Date( date.getFullYear(), date.getMonth() + 1, 0 ).getDate();
            this.days = Array( this.DAYS_OF_WEEK ).fill( this.first ).map(
                ( day, index ) => day > 0 ? day + index : lastDayOfPrevMonth--
            );
        }
    }

    get current()
    {
        return this.service.currentDate;
    }
}
