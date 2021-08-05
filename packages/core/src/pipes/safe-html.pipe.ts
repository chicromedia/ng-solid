import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Pipe({
  name: 'nsSafeHtml'
})
export class NsSafeHtmlPipe implements PipeTransform
{
  constructor(private dom: DomSanitizer) {}

  transform(value: string): SafeHtml
  {
    return value ? this.dom.bypassSecurityTrustHtml(value) : "";
  }

}
