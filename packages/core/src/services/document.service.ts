import { Injectable } from '@angular/core';

@Injectable()
export class DocumentRef
{

  constructor() { }

  get nativeDocument()
  {
    return document;
  }

}
