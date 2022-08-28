import { Pipe, PipeTransform } from '@angular/core';
import { NsSchedule } from '../models/schedule';
import { notEmpty } from '@ng-solid/core';

@Pipe( {
    name: 'filterByDay'
} )
export class FilterByDayPipe implements PipeTransform
{

    transform( schedules: NsSchedule[], day: number ): NsSchedule[]
    {
        return notEmpty( schedules )
            ? schedules.filter( s => new Date( s.startTime ).getDate() === day )
            : [];
    }

}
