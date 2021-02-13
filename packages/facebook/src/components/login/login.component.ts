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
  with: number;
  @Input()
  size: fb.FacebookButtonSize = 'large';
  @Input()
  rounded: boolean;
  @Input()
  scope: string;
  @Output()
  onLogin: Subject<fb.StatusResponse> = new Subject<fb.StatusResponse>();
  @Input()
  disabled: boolean = true;

  constructor(private facebook: NsFacebookService) { }

  ngOnInit(): void
  {
    this.facebook.onReady.subscribe(() => this.disabled = false);
  }

  @HostBinding('style.width')
  get styleWidth()
  {
    return `${ this.with }px`;
  }

  @HostListener('click', [ "$event" ])
  login(event: MouseEvent)
  {
    this.disabled = true;
    this.facebook.login(this.scope)
      .subscribe(status =>
        {
          this.disabled = false;
          this.onLogin.next(status)
        },
        () => this.disabled = false
      );
  }

  ngOnDestroy()
  {

  }

}
