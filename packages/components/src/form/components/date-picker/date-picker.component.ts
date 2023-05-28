import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NsDateView } from '../../../types';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NsFormControlValueAccessor } from '../../models/form-control-value-accessor';
import { isDateValid } from '@ng-solid/core';


@Component( {
    selector: 'ns-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: [ './date-picker.component.scss' ],
    host: {
        '[class.ns-date-picker]': 'true'
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef( () => NsDatePickerComponent ),
            multi: true
        }
    ]
} )
export class NsDatePickerComponent extends NsFormControlValueAccessor implements OnInit
{

    @Input()
    format: string = 'mm of yyyy';
    @Input()
    placement: 'start' | 'end' = 'start';
    @Input()
    view: NsDateView;
    @Input()
    editable: boolean;

    show: boolean;
    viewDate: Date;
    days: Date[];
    weeks: any[] = [];
    times: { [ key: string ]: string }[] = [];

    identity = ( index, item: Date ) => item.getDate();

    private readonly current: Date = new Date();
    private readonly HOURS: number = 24;
    private _hour: string;

    constructor()
    {
        super();
    }

    ngOnInit(): void
    {
        if ( this.editable )
        {
            let cursor = 0;
            while ( cursor < this.HOURS )
            {
                const fixed = Math.floor( cursor );
                const time = cursor === fixed ? `${ cursor }:00` : `${ fixed }:30`;
                this.times.push( { label: time, value: time } );
                cursor += .5;
            }
        }
    }

    writeValue( date: any )
    {
        this._value = new Date( isDateValid( date ) ? date : null );
        this.refreshView( this.value );
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

        const hour = date.getHours();
        const minutes = date.getMinutes();
        this._hour = minutes >= 0 || minutes <= 29 ? `${ hour }:00` : `${ hour }:30`;
    }

    isCurrentDate( day: Date )
    {
        return day.getFullYear() == this.current.getFullYear()
            && day.getMonth() == this.current.getMonth()
            && day.getDate() == this.current.getDate();
    }

    selectedInWeek( date: Date, week: Date[] )
    {
        if ( date instanceof Date && this.value && this.view == 'day' )
        {
            return date.getDate() == this.value.getDate()
                && date.getMonth() == this.value.getMonth()
                && date.getFullYear() == this.value.getFullYear();
        }

        return this.value instanceof Date
            ? week.some(
                d => d.getDate() == this.value.getDate()
                    && d.getMonth() == this.value.getMonth()
                    && d.getFullYear() == this.value.getFullYear()
            ) : false;
    }

    get hour()
    {
        return this._hour;
    }

    set hour( value: string )
    {
        if ( !!value && this.value instanceof Date )
        {
            const [ hour, minutes ] = value.split( ':' ).map( Number );
            this._value.setHours( hour, minutes, 0, 0 );
            this._hour = value;
            this.onChange( this.value );
        }
    }

}
