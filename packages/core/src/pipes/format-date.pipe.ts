import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
    name: 'nsFormatDate'
} )
export class NsFormatDatePipe implements PipeTransform
{
    private readonly months: string[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];

    private weekdays: string[] = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    transform( date: Date, format: string = 'yyyy-mm-dd' ): string
    {
        return date instanceof Date
            ? format
                .replace( 'dd', this.weekdays[ date.getDay() ] )
                .replace( 'mm', this.months[ date.getMonth() ] )
                .replace( 'yyyy', String( date.getFullYear() ) )
            : '';
    }

}
