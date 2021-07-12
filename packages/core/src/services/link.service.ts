import { Inject, Injectable, Renderer2, RendererFactory2, ViewEncapsulation } from '@angular/core';
import { LinkDefinition } from "../interfaces/link-definition";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class NsLinkService
{
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: any)
  {
    this.renderer = this.rendererFactory.createRenderer(this.document, {
      id: '-1',
      encapsulation: ViewEncapsulation.None,
      styles: [],
      data: {}
    });
  }

  setTag(tag: LinkDefinition)
  {
    const selector = `link[rel='${ tag.rel }']`;
    let link = this.document.querySelector(selector) || this.renderer.createElement('link');
    Object.keys(tag).forEach((prop: string) => this.renderer.setAttribute(link, prop, tag[prop]));

    if ( !this.document.querySelector(selector) )
    {
      const head = this.document.head;
      this.renderer.appendChild(head, link);
    }
  }

  remove(name: string)
  {
    const head = this.document.head;
    const selector = `link[rel='${ name }']`;
    const link = this.document.querySelector(selector);
    if ( link )
    {
      this.renderer.removeChild(head, link);
    }
  }
}
