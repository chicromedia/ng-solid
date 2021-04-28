import { InjectionToken } from "@angular/core";
import { GoogleSetup } from "../interfaces/google-setup";

export const NS_GOOGLE_CONFIG: InjectionToken<GoogleSetup> = new InjectionToken('ns_google_config');
