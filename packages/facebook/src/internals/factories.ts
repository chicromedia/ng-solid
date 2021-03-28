import { Meta } from "@angular/platform-browser";
import { NsFacebookService } from "../services/facebook.service";

export const createFacebookService = (platformId: string, config: fb.InitParams, meta: Meta) =>
{
  return new NsFacebookService(platformId, config, meta)
}

