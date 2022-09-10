import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControlValueAccessor } from '../../../form/models/form-control-value-accessor';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NsScheduleView } from '../../types/schedule-view';

@Component( {
    selector: 'ns-schedule-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: [ './calendar.component.scss' ],
    host: {
        '[class.ns-dropdown]': 'true',
        '[class.ns-show]': 'show'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef( () => NsScheduleCalendarComponent ),
            multi: true
        }
    ]
} )
export class NsScheduleCalendarComponent extends FormControlValueAccessor<Date> implements OnInit
{
    @Input()
    format: string = 'mm of yyyy';
    @Input()
    placement: 'start' | 'end' = 'start';
    @Input()
    view: NsScheduleView;

    show: boolean;
    viewDate: Date;
    days: Date[];
    weeks: any[] = [];

    identity = ( index, item: Date ) => item.getDate();

    private current: Date = new Date();

    constructor()
    {
        super();
    }

    ngOnInit(): void
    {
    }

    writeValue( date: Date )
    {
        if ( date instanceof Date )
        {
            this._value = date;
            this.refreshView( date );
        }
    }

    getDaysInMonth( month, year )
    {
        const date = new Date( year, month, 1 );
        const days = [];
        while ( date.getMonth() === month )
        {
            days.push( new Date( date ) );
            date.setDate( date.getDate() + 1 );
        }

        const first = new Date( days[ 0 ] );
        let firstDay = first.getDay();
        first.setMonth( first.getMonth() - 1 );

        const before = [];
        while ( firstDay > 0 )
        {
            first.setDate( first.getDate() - 1 );
            before.push( new Date( first ) );
            firstDay--;
        }

        const after = [];
        const last = new Date( days[ days.length - 1 ] );
        while ( last.getDay() < 6 )
        {
            last.setDate( last.getDate() + 1 );
            after.push( new Date( last ) );
        }

        return [].concat( before.reverse(), days, after );
    }

    toggle()
    {
        this.show = !this.show;
        if ( !this.show )
        {
            this.refreshView( this.viewDate = this.value );
        }
    }

    prev()
    {
        this.viewDate.setMonth( this.viewDate.getMonth() - 1 );
        this.refreshView( this.viewDate );
    }

    next()
    {
        this.viewDate.setMonth( this.viewDate.getMonth() + 1 );
        this.refreshView( this.viewDate );
    }

    private refreshView( date: Date )
    {
        this.days = this.getDaysInMonth( date.getMonth(), date.getFullYear() );
        this.viewDate = new Date( date );
        this.weeks = [];

        let cursor = 0;
        for ( const day of this.days )
        {
            this.weeks[ cursor ] = typeof this.weeks[ cursor ] !== 'undefined' ? this.weeks[ cursor ] : [];
            this.weeks[ cursor ]!.push( day );
            if ( this.weeks[ cursor ].length == 7 )
            {
                cursor++;
            }
        }
    }

    isCurrentDate( day: Date )
    {
        return day.getFullYear() == this.current.getFullYear()
            && day.getMonth() == this.current.getMonth()
            && day.getDate() == this.current.getDate();
    }

    selectedInWeek( date: Date, week: Date[] )
    {
        if ( this.value && this.view == 'day' )
        {
            return date.getDate() == this.value.getDate()
                && date.getMonth() == this.value.getMonth()
                && date.getFullYear() == this.value.getFullYear();
        }

        return this.value
            ? week.some(
                date => date.getDate() == this.value.getDate()
                    && date.getMonth() == this.value.getMonth()
                    && date.getFullYear() == this.value.getFullYear()
            ) : false;
    }
}
