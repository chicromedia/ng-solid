import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-solid',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit
{
    schedules: NsSchedule[] = [
        new NsSchedule( {
            id: 1,
            subject: 'Paquete de eBay',
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
            startTime: '2022-09-05 01:00:00',
            endTime: '2022-09-05 02:00:00'
        } ),
        new NsSchedule( {
            id: 2,
            subject: 'Paquete de Amazon',
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.',
            startTime: '2022-08-28 02:00:00',
            endTime: '2022-08-28 03:00:00'
        } )
    ];

    constructor()
    {
    }

    ngOnInit()
    {
    }

    click( event: any )
    {
        console.log( event );
    }
}
