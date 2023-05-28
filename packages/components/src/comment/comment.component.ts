import { Component, Input, OnInit, Output } from '@angular/core';
import { NsComment } from "./interfaces/comment";
import { Subject } from "rxjs";


@Component({
  selector: 'ns-comment',
  templateUrl: './comment.component.html',
  styleUrls: [ './comment.component.scss' ]
})
export class NsCommentComponent implements OnInit
{
  @Input()
  title: string;
  @Input()
  description: string;
  @Input()
  placeholder: string;
  @Input()
  messages: NsComment[] = [];
  @Input()
  cover: { url: string; alt?: string; };
  @Input()
  submitText: string;
  @Input()
  logged: boolean;
  @Input()
  maxLength: number = 128;
  @Input()
  disabled: boolean;

  @Output()
  commit: Subject<string> = new Subject<string>();

  public invalid: boolean = false;
  public content: string = "";

  private clearEmptyValues: RegExp = new RegExp(/(<div><br><\/div>)*/g);

  constructor() {}

  ngOnInit(): void
  {
  }

  publish()
  {
    if ( this.content )
    {
      this.commit.next(this.content.replace(this.clearEmptyValues, ""));
      this.content = "";
    } else
    {
      this.invalid = true;
    }
  }

  get counter()
  {
    const characters = this.maxLength - this.content.length;
    return characters > 0 ? characters : 0;
  }
}
