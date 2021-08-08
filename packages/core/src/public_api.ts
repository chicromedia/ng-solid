/*
 * Public API Surface of core
 */

export * from './core.module';
export { WindowRef } from './services/window.service';
export { NsLinkService } from './services/link.service';
export { NsCookieService } from './services/cookie.service';
export { NsSafeHtmlPipe } from './pipes/safe-html.pipe';
export { NsHumanizePipe } from './pipes/humanize.pipe';
export { Guid } from './utils/guid';
export * from './utils/functions';
