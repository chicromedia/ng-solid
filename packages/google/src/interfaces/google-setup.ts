export interface GoogleSetup
{
  analyticsId: string;
  currency: string;
  trackingPages: boolean;
  adClient: string;
  adSlot: string | number;
  adFormat: string;
  display: string;
  width: number;
  height: number;
  layout: string;
  layoutKey: string;
  pageLevelAds: boolean;
  fullWidthResponsive: boolean;
  enabled: boolean;
}
