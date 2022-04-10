export class YesNo
{
  static readonly YES: string = 'Y';
  static readonly NO: string = 'N';

  static isYes(value: string): boolean
  {
    return value === YesNo.YES;
  }

  static isNo(value: string): boolean
  {
    return value !== YesNo.YES;
  }

  static yesOrNo(value: boolean)
  {
    return value ? YesNo.YES : YesNo.NO;
  }
}
