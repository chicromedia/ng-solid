import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsScheduleComponent } from './schedule.component';
import { NsWorkweekComponent } from './components/workweek/workweek.component';
import { DayComponent } from './components/day/day.component';
import { WeekComponent } from './components/week/week.component';
import { FilterByDayPipe } from './pipes/filter-by-day.pipe';
import { NsScheduleEventComponent } from './components/event/event.component';
import { NsScheduleCellComponent } from './components/cell/cell.component';
import { NsButtonModule } from '../button/button.module';
import { FormsModule } from '@angular/forms';
import { NsCoreModule } from '@ng-solid/core';
import { NsWeekdayPipe } from './pipes/nsWeekday.pipe';
import { NsDropdownModule } from '../dropdown';
import { NsFormsModule } from '../form';


@NgModule( {
    imports: [
        CommonModule,
        NsCoreModule,
        NsButtonModule,
        NsDropdownModule,
        FormsModule,
        NsFormsModule
    ],
    declarations: [
        NsScheduleComponent,
        NsWorkweekComponent,
        NsWeekdayPipe,
        DayComponent,
        WeekComponent,
        FilterByDayPipe,
        NsScheduleEventComponent,
        NsScheduleCellComponent,
    ],
    exports: [
        NsScheduleComponent
    ]
} )
export class NsScheduleModule
{
}
