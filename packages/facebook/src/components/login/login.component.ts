import { Component, HostBinding, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NS_BUTTON_STYLES_HOST } from "../../providers/btn.provider";
import { Subject } from "rxjs";
import { NsFacebookService } from "../../services/facebook.service";

@Component({
  selector: 'ns-facebook-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ],
  host: NS_BUTTON_STYLES_HOST
})
export class NsFacebookLoginComponent implements OnInit, OnDestroy
{

  @Input()
  label: 'continue_with' | 'login_with' = 'continue_with';
  @Input()
  labelArgs: string[] = [ 'Facebook' ];
  @Input()
  with: number = 240;
  @Input()
  size: fb.FacebookButtonSize = 'large';
  @Input()
  rounded: boolean;
  @Input()
  scope: string;
  @Output()
  onLogin: Subject<fb.StatusResponse> = new Subject<fb.StatusResponse>();

  constructor(private facebook: NsFacebookService) { }

  ngOnInit(): void
  {

  }

  @HostBinding('style.width')
  get styleWidth()
  {
    return `${ this.with }px`;
  }

  get params()
  {
    return {
      ...this.labelArgs
    }
  };

  @HostListener('click', [ "$event" ])
  login(event: MouseEvent)
  {
    this.facebook.login(this.scope).subscribe(
      status => this.onLogin.next(status)
    );
  }

  ngOnDestroy()
  {

  }

}
