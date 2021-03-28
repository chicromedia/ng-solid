import { Provider } from "@angular/core";
import { WindowRef } from "../services/window.service";
import { DocumentRef } from "../services/document.service";

export const BROWSER_GLOBAL_PROVIDERS: Provider[] = [ WindowRef, DocumentRef ];
