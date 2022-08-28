import { Injector, Type } from '@angular/core';

export interface NsModalSetup<T = any>
{
    title?: string;
    component: Type<T>;
    context?: Partial<T>;
    size?: 'lg' | 'sm' | 'xl';
    header?: boolean;
    injector?: Injector;
}
