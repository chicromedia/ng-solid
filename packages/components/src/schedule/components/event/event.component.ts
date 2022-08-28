import { AfterContentInit, Component, HostListener, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NsSchedule } from '../../models/schedule';
import { NsScheduleService } from '../../services/schedule.service';

@Component( {
    selector: 'ns-schedule-event',
    templateUrl: './event.component.html',
    styleUrls: [ './event.component.scss' ],
    host: {
        '[class.ns-schedule__event]': 'true',
        '[class.ns-schedule__event--show]': 'schedule && matchHour',
        '[style.height.px]': 'height'
    },
    encapsulation: ViewEncapsulation.None
} )
export class NsScheduleEventComponent implements OnInit, AfterContentInit
{

    @Input()
    schedule: NsSchedule;
    @Input() timeline: number;

    public height: number;

    constructor( private service: NsScheduleService )
    {
    }

    ngOnInit(): void
    {
    }


    ngAfterContentInit()
    {
        if ( this.schedule )
        {
            const startTime = new Date( this.schedule.startTime );
            const endTime = new Date( this.schedule.endTime );
            const hours = Math.abs( startTime.getTime() - endTime.getTime() ) / 36e5;
            this.height = hours > .5 ? 49.5 * ( hours / .5 ) : 45;
        }
    }

    @HostListener( 'click', [ '$event' ] )
    onClick( event: MouseEvent )
    {
        event.preventDefault();
        this.service.send( this.schedule );
    }

    get matchHour()
    {
        return new Date( this.schedule.startTime ).getHours() === this.timeline;
    }

}
