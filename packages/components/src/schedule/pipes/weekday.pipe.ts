import { Pipe, PipeTransform } from '@angular/core';

@Pipe( {
    name: 'weekday'
} )
export class WeekdayPipe implements PipeTransform
{
    private weekdays: string[] = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ];

    transform( day: number ): string
    {
        return this.weekdays[ day ];
    }
}
