export interface LinkDefinition
{
  charset?: string;
  crossOrigin?: string;
  href?: string;
  hreflang?: string;
  media?: string;
  rel?: string;
  rev?: string;
  sizes?: string;
  target?: string;
  type?: string;

  [prop: string]: string;
}
