import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NsIconService } from "../../services/icon.service";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Directive({
  selector: 'ns-icon',
  host: {
    '[class.ns-icon]': 'true'
  }
})
export class NsIconComponent implements OnInit, OnDestroy
{
  @Input()
  name: string;
  @Input()
  width: number = 24;
  @Input()
  height: number = 24;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly element: ElementRef<HTMLElement>,
              private readonly renderer: Renderer2,
              private iconService: NsIconService)
  { }

  ngOnInit()
  {
    this.iconService.add(this.name).pipe(takeUntil(this.destroy$)).subscribe(({ icon }) =>
    {
      this.renderer.setProperty(this.element.nativeElement, 'innerHTML', icon);
      const svg: SVGElement = this.element.nativeElement.querySelector('svg');
      if ( svg )
      {
        this.iconService.normalizeSVG(svg, this.width, this.height);
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
        this.iconService.normalizeSVG(child as SVGElement, this.width, this.height);
      }
    })
  }

  ngOnDestroy(): void
  {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
