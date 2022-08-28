import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-solid',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit
{
  show: boolean;
  constructor() {}

    ngOnInit()
    {
    }

    click( event: any )
    {
        console.log( event );
    }
}
