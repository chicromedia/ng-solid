import { Component, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NsScheduleView } from './index';
import { Subject } from 'rxjs';
import { NsScheduleService } from './services/schedule.service';
import { NsSchedule } from './models/schedule';

@Component( {
    selector: 'ns-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: [ './schedule.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[style.height.px]': 'height'
    }
} )
export class NsScheduleComponent implements OnInit
{

    @Input() view: NsScheduleView = 'workweek';
    @Input() selected: Date = new Date();
    @Input() height: number = 520;
    @Input() data: NsSchedule[];

    @Output()
    onClick: Subject<NsSchedule> = this.service.onClick$;

    constructor( private service: NsScheduleService )
    {
    }

    ngOnInit(): void
    {
    }

    goToday()
    {
        this.service.setCurrentDate( new Date() );
    }
}
