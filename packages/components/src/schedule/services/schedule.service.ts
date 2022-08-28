import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NsSchedule } from '../models/schedule';

@Injectable( {
    providedIn: 'root'
} )
export class NsScheduleService
{

    public readonly onClick$: Subject<NsSchedule> = new Subject<NsSchedule>();
    private _date: Date;

    constructor()
    {
    }

    setCurrentDate( date )
    {
        this._date = date;
    }

    get currentDate()
    {
        return this._date;
    }

    send( schedule: Partial<NsSchedule> )
    {
        this.onClick$.next( new NsSchedule( schedule ) );
    }

    formatDate( date: Date )
    {
        const pad = num => ( '00' + num ).slice( -2 );
        return date.getFullYear() + '-' +
            pad( date.getMonth() + 1 ) + '-' +
            pad( date.getDate() ) + ' ' +
            pad( date.getHours() ) + ':' +
            pad( date.getMinutes() ) + ':' +
            pad( date.getSeconds() );
    }
}
