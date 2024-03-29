import { Component, Input, OnInit } from '@angular/core';
import { NsScheduleService } from '../../services/schedule.service';
import { NsSchedule } from '../../models/schedule';

@Component( {
    selector: 'ns-schedule-workweek',
    templateUrl: './workweek.component.html',
    styles: [ '.ns-schedule__header-wrap,.ns-schedule__timeline {grid-template-columns: [index] 3rem repeat(5, 1fr);}' ]
} )
export class NsWorkweekComponent implements OnInit
{

    @Input() schedules: NsSchedule[];

    public current: number;
    public first: number;
    public last: number;
    public days: number[] = [];
    public hours: number[];

    identityDay = ( index, item: NsSchedule ) => item.id;

    private DAYS_OF_WORKWEEK: number = 5;

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
            this.first = ( date.getDate() - date.getDay() ) + 1;
            this.last = this.first + 4;
            this.days = [];
            this.service.setCurrentDate( date );
            let lastDayOfPrevMonth = new Date( date.getFullYear(), date.getMonth() - 1, -1 ).getDate();

            let current = 0;
            while ( current < this.DAYS_OF_WORKWEEK )
            {
                this.days.push( this.first < 1 ? lastDayOfPrevMonth : this.first );
                this.first++;
                lastDayOfPrevMonth--;
                current++;
            }
        }
    }
}
