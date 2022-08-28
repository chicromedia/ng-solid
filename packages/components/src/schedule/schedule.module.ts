import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsScheduleComponent } from './schedule.component';
import { NsWorkweekComponent } from './components/workweek/workweek.component';
import { WeekdayPipe } from './pipes/weekday.pipe';
import { DayComponent } from './components/day/day.component';
import { WeekComponent } from './components/week/week.component';
import { FilterByDayPipe } from './pipes/filter-by-day.pipe';
import { NsScheduleEventComponent } from './components/event/event.component';
import { NsScheduleCellComponent } from './components/cell/cell.component';
import { NsButtonModule } from '../button/button.module';
import { NsDropdownModule } from '../dropdown/dropdown.module';
import { FormsModule } from '@angular/forms';


@NgModule( {
    imports: [
        CommonModule,
        NsButtonModule,
        NsDropdownModule,
        FormsModule
    ],
    declarations: [
        NsScheduleComponent,
        NsWorkweekComponent,
        WeekdayPipe,
        DayComponent,
        WeekComponent,
        FilterByDayPipe,
        NsScheduleEventComponent,
        NsScheduleCellComponent
    ],
    exports: [
        NsScheduleComponent
    ]
} )
export class NsScheduleModule
{
}
