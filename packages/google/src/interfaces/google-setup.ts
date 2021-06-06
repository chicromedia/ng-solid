export interface GoogleSetup
{
  analyticsId: string;
  currency: string;
  trackingPages: boolean;
  adClient: string;
  adSlot: string | number;
  adFormat: GoogleAdFormat;
  display: string;
  width: string;
  height: string;
  layout: string;
  layoutKey: string;
  pageLevelAds: boolean;
  adResponsive: boolean;
  adClassName: string;
  enabled: boolean;
}
