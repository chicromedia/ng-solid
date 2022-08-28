import { Component, HostListener, Input, OnInit } from '@angular/core';
import { NsScheduleService } from '../../services/schedule.service';

@Component( {
    selector: 'ns-schedule-cell',
    template: '',
    styles: [],
    host: {
        '[class.ns-schedule__timeline-cell]': 'true'
    }
} )
export class NsScheduleCellComponent implements OnInit
{
    @Input()
    day: number;
    @Input()
    timeline: number;
    @Input()
    startIn: number;
    @Input()
    endIn: number;

    constructor( private service: NsScheduleService )
    {
    }

    ngOnInit(): void
    {
    }

    @HostListener( 'click', [ '$event' ] )
    onClick( event: MouseEvent )
    {
        event.preventDefault();
        const startTime = new Date(
            this.service.currentDate.getFullYear(),
            this.service.currentDate.getMonth(),
            this.day,
            this.timeline,
            this.startIn
        );
        const endTime = new Date(
            this.service.currentDate.getFullYear(),
            this.service.currentDate.getMonth(),
            this.day,
            this.timeline,
            this.endIn );

        this.service.send( {
            startTime: this.service.formatDate( startTime ),
            endTime: this.service.formatDate( endTime )
        } );
    }

}
