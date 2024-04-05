import { Component, Input, Output, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { NsScheduleService } from './services/schedule.service';
import { NsSchedule } from './models/schedule';
import { NsDateView } from '../types';

@Component( {
    selector: 'ns-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: [ './schedule.component.scss' ],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.ns-schedule]': 'true'
    }
} )
export class NsScheduleComponent
{

    @Input() view: NsDateView = 'workweek';
    @Input() selected: Date = new Date();
    @Input() height: number = 520;
    @Input() data: NsSchedule[];

    @Output()
    onClick: Subject<NsSchedule>;

    constructor( private service: NsScheduleService )
    {
        this.onClick = this.service.onClick$;
    }

    goToday()
    {
        this.selected = new Date();
    }
}
