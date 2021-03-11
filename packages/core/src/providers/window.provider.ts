import { InjectionToken, Provider } from "@angular/core";

export const WINDOW = new InjectionToken('WINDOW');
export const WINDOW_PROVIDER: Provider = { provide: WINDOW, useValue: window };
