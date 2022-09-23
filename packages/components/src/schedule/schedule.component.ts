import { Component, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
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
export class NsScheduleComponent implements OnInit
{

    @Input() view: NsDateView = 'workweek';
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
        this.selected = new Date();
    }
}
