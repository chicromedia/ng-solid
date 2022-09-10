import { Pipe, PipeTransform } from '@angular/core';
import { NsSchedule } from '../models/schedule';
import { notEmpty } from '@ng-solid/core';
import { NsScheduleService } from '../services/schedule.service';

@Pipe( {
    name: 'filterByDay'
} )
export class FilterByDayPipe implements PipeTransform
{
    constructor( private service: NsScheduleService )
    {
    }

    transform( schedules: NsSchedule[], day: number ): NsSchedule[]
    {
        const current = this.service.currentDate;
        const selector = ( { startTime }: NsSchedule ) =>
        {
            const date = new Date( startTime );
            return day === date.getDate() && current.getMonth() === date.getMonth() && current.getFullYear() === date.getFullYear();
        };
        return notEmpty( schedules )
            ? schedules.filter( selector )
            : [];
    }

}
