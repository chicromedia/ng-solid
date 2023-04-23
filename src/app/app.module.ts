import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NsFacebookModule } from '@ng-solid/facebook';
import { HttpClientModule } from '@angular/common/http';
import { NsTwitterModule } from '@ng-solid/twitter';
import { NsGoogleModule } from '@ng-solid/google';
import { NsCoreModule } from '@ng-solid/core';
import { NsDropdownModule, NsSchemaMarkupModule } from '@ng-solid/components';

@NgModule( {
    imports: [
        BrowserModule,
        HttpClientModule,
        NsCoreModule,
        NsFacebookModule.forRoot( {
            appId: '1389249668088014',
            debug: !environment.production
        } ),
        NsGoogleModule.forRoot( {
            analyticsId: 'G-2HK22MX8LY',
            adClient: 'ca-pub-2914026827620139',
            adSlot: 2858574739,
            adClassName: 'mb-1',
            adEnabled: environment.production,
            adFormat: 'rectangle'
        } ),
        NsTwitterModule,
        NsSchemaMarkupModule,
        NsDropdownModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [],
    bootstrap: [ AppComponent ]
} )
export class AppModule
{
}
