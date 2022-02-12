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

  onLogin(status: fb.StatusResponse)
  {

  }

  onShared(shared: fb.ShareDialogResponse)
  {

  }
}
