import { SafeHtml } from "@angular/platform-browser";

export class IconDefinition
{
  name: string;
  icon: SafeHtml;

  constructor(props: IconDefinition)
  {
    Object.assign(this, props)
  }
}
