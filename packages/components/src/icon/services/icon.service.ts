import {
  Inject,
  Injectable,
  InjectionToken,
  Renderer2,
  RendererFactory2,
  SecurityContext,
  Self,
  ViewEncapsulation
} from '@angular/core';
import { IconDefinition } from "../models/icon-definition";
import { DomSanitizer } from "@angular/platform-browser";
import { HttpClient } from "@angular/common/http";
import { filter, map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { DOCUMENT } from "@angular/common";
import { IconSetup } from "../interfaces/icon-setup";

export const NS_ICONS_SETUP = new InjectionToken('ns_icons_setup');

@Injectable({
  providedIn: 'root'
})
export class NsIconService
{
  private cache: BehaviorSubject<Map<string, IconDefinition>> = new BehaviorSubject(new Map<string, IconDefinition>());
  private renderer: Renderer2;

  constructor(@Self() @Inject(NS_ICONS_SETUP) private setup: IconSetup,
              private http: HttpClient,
              private rendererFactory: RendererFactory2,
              @Inject(DOCUMENT) private document: any,
              private sanitizer: DomSanitizer)
  {
    this.renderer = this.rendererFactory.createRenderer(this.document, {
      id: '-1',
      encapsulation: ViewEncapsulation.None,
      styles: [],
      data: {}
    });
  }

  add(name: string)
  {
    if ( !this.cache.value.has(name) )
    {
      this.importIcon(this.setup.path.concat(`/${ name }`)).subscribe(
        icon => this.cache.next(this.cache.value.set(name, new IconDefinition({ name, icon }))),
        error => console.warn(`Cannot find resource for icon '${ name }' in ${ this.setup.path }`)
      )
    }
    return this.get(name);
  }

  get(name: string)
  {
    return this.cache.pipe(map(value => value.get(name)), filter(value => !!value));
  }

  private importIcon(path: string)
  {
    const safeUrl = this.sanitizer.sanitize(SecurityContext.URL, `${ path }.svg`);
    return this.http.get(safeUrl, { responseType: "text", headers: { ContentType: 'image/svg+xml' } });
  }

  normalizeSVG(svg: SVGElement, size: number)
  {
    if ( !svg.getAttribute('viewBox') )
    {
      this.renderer.setAttribute(svg, 'viewBox', `0 0 ${ size } ${ size }`);
    }
    this.renderer.setAttribute(svg, 'width', String(size));
    this.renderer.setAttribute(svg, 'height', String(size));
    if ( !svg.getAttribute('fill') )
    {
      this.renderer.setAttribute(svg, 'fill', 'currentColor');
    }
  }
}
