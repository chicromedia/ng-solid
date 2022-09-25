import { InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NS_ICONS, NsIconComponent } from './icon.component';
import { IconSetup } from './interfaces/icon-setup';
import { IconDefinition } from './models/icon-definition';
import { Icons } from './icons';
import { IconCollection } from './models/icon-collection';

export const NS_ICONS_SETUP = new InjectionToken( 'ns_icons_setup' );

@NgModule( {
    imports: [ CommonModule ],
    declarations: [ NsIconComponent ],
    exports: [ NsIconComponent ]
} )
export class NsIconModule
{
    static forRoot( setting?: IconSetup ): ModuleWithProviders<NsIconModule>
    {
        const iconFactory = ( setting?: IconSetup ) =>
        {
            const icons = new Map<string, IconDefinition>();
            if ( setting )
            {
                for ( const icon of setting.extraIcons )
                {
                    icons.set( icon.name, icon );
                }
            }
            for ( const name in Icons )
            {
                icons.set( name, new IconDefinition( { name, icon: Icons[ name ] } ) );
            }
            return new IconCollection( icons );
        };

        return {
            ngModule: NsIconModule,
            providers: [
                {
                    provide: NS_ICONS_SETUP,
                    useValue: setting
                },
                {
                    provide: NS_ICONS,
                    useFactory: iconFactory,
                    deps: [ NS_ICONS_SETUP ]
                }
            ]
        };
    }
}
