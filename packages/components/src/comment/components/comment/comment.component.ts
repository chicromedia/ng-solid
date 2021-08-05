import { Component, ElementRef, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { IComment } from "../../interfaces/comment";
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
  messages: IComment[] = [];
  @Input()
  cover: { url: string; alt?: string; };
  @Input()
  submitText: string;
  @Input()
  logged: boolean;

  @Output()
  submit: Subject<string> = new Subject<string>();

  @ViewChild("contentEditable", { static: false, read: ElementRef }) elementRef: ElementRef<HTMLDivElement>;

  public invalid: boolean = false;
  private _disabled: boolean;
  content: string;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void
  {
  }

  change(event: any)
  {
    this.content = event.target.innerHTML;
  }

  publish()
  {
    if ( this.content )
    {
      this.submit.next(this.content);
      this.content = "";
      this.elementRef.nativeElement.innerHTML = "";
    } else
    {
      this.invalid = true;
    }
  }

  @Input()
  set disabled(value: boolean)
  {
    this._disabled = value;
    this.renderer.setAttribute(this.elementRef.nativeElement, "contenteditable", String(!value));
  }

  get disabled()
  {
    return this._disabled;
  }
}
