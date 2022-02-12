import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { NsIconService } from "../../services/icon.service";

@Component({
  selector: 'ns-icon',
  template: '',
  styles: [ ':host{display: flex; justify-content: center; align-content: center}' ],
  host: {
    '[class.ns-icon]': 'true'
  },
})
export class NsIconComponent implements OnInit, OnChanges, OnDestroy
{
  @Input()
  name: string;
  @Input()
  size: number = 24;

  constructor(private readonly element: ElementRef<HTMLElement>,
              private readonly renderer: Renderer2,
              private readonly iconService: NsIconService)
  { }

  ngOnInit()
  {
  }

  ngOnChanges({ name }: SimpleChanges)
  {
    if ( name && name.currentValue )
    {
      this.iconService.add(name.currentValue).subscribe(({ icon }) =>
      {
        this.renderer.setProperty(this.element.nativeElement, 'innerHTML', icon);
        const svg: SVGElement = this.element.nativeElement.querySelector('svg');
        if ( svg )
        {
          this.iconService.normalizeSVG(svg, this.size);
        }
      })
    }
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
  }

}
