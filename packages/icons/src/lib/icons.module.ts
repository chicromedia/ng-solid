import { ModuleWithProviders, NgModule } from '@angular/core';
import { IconsComponent } from './icons.component';
import { NsIconDefinition } from './interfaces/icon-definition';
import { NS_ICONS, NS_ICONS_PATCH } from './providers/constants';
import { NsIconsPatchService } from './services/icons-patch.service';

@NgModule( {
    imports: [],
    declarations: [ IconsComponent ],
    exports: [ IconsComponent ]
} )
export class NsIconsModule
{
    static forRoot( icons: NsIconDefinition[] = [] ): ModuleWithProviders<NsIconsModule>
    {
        return {
            ngModule: NsIconsModule,
            providers: [
                {
                    provide: NS_ICONS,
                    useValue: icons
                }
            ]
        };
    }

    static forFeature( icons: NsIconDefinition[] ): ModuleWithProviders<NsIconsModule>
    {
        return {
            ngModule: NsIconsModule,
            providers: [
                NsIconsPatchService,
                {
                    provide: NS_ICONS_PATCH,
                    useValue: icons
                }
            ]
        };
    }
}
