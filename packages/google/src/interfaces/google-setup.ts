export interface GoogleSetup
{
  analyticsId: string;
  currency: string;
  trackingPages: boolean;
  adClient: string;
  adSlot: string | number;
  adFormat: GoogleAdFormat;
  adDisplay: string;
  adWidth: number;
  adHeight: number;
  adLayout: string;
  adLayoutKey: string;
  pageLevelAds: boolean;
  adResponsive: boolean;
  adClassName: string;
  adEnabled: boolean;
}
