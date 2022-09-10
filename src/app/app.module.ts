import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { NsFacebookModule } from '@ng-solid/facebook';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NsTwitterModule } from '@ng-solid/twitter';
import { NsGoogleModule } from '@ng-solid/google';
import { NsCoreModule } from '@ng-solid/core';
import {
    NS_IMAGE_UPLOAD_PROVIDER,
    NsButtonModule,
    NsDropdownModule,
    NsEditorModule,
    NsIconModule,
    NsImageUpload,
    NsImageUploadClient,
    NsImageUploadModule,
    NsScheduleModule,
    NsSchemaMarkupModule
} from '@ng-solid/components';
import { ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

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
            adClient: "ca-pub-2914026827620139",
            adSlot: 2858574739,
            adClassName: 'mb-1',
            adEnabled: environment.production,
            adFormat: "rectangle"
        } ),
        NsTwitterModule,
        NsSchemaMarkupModule,
        NsIconModule.forRoot( { path: './assets/icons' } ),
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
