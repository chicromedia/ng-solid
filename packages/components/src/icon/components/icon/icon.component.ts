import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NsIconService } from "../../services/icon.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'ns-icon',
  template: '',
  styles: [ ':host{display: flex; justify-content: center; align-content: center}' ],
  host: {
    '[class.ns-icon]': 'true'
  },
})
export class NsIconComponent implements OnInit, OnDestroy
{
  @Input()
  name: string;
  @Input()
  size: number = 24;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly element: ElementRef<HTMLElement>,
              private readonly renderer: Renderer2,
              private readonly iconService: NsIconService)
  { }

  ngOnInit()
  {
    this.iconService.add(this.name).pipe(takeUntil(this.destroy$)).subscribe(({ icon }) =>
    {
      this.renderer.setProperty(this.element.nativeElement, 'innerHTML', icon);
      const svg: SVGElement = this.element.nativeElement.querySelector('svg');
      if ( svg )
      {
        this.iconService.normalizeSVG(svg, this.size);
      }
    })
  }

  ngAfterContentChecked(): void
  {
    const { children } = this.element.nativeElement;
    Array(children.length).forEach((_, i) =>
    {
      const child = children.item(i);
      if ( child.tagName.toLowerCase() === 'svg' )
      {
        this.iconService.normalizeSVG(child as SVGElement, this.size);
      }
    })
  }

  ngOnDestroy(): void
  {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
