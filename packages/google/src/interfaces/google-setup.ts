export interface GoogleSetup
{
  analyticsId: string;
  currency: string;
  trackingPages: boolean;
  adClient: string;
  adSlot: string | number;
  adFormat: GoogleAdFormat;
  display: string;
  width: number;
  height: number;
  layout: string;
  layoutKey: string;
  pageLevelAds: boolean;
  fullWidthResponsive: boolean;
  adClassName: string;
  enabled: boolean;
}
