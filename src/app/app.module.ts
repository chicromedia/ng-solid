import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NsCoreModule } from '@ng-solid/core';
import { NsDropdownModule } from '@ng-solid/components';
import { accessible, NsIconsModule } from '@ng-solid/icons';

@NgModule( {
    imports: [
        BrowserModule,
        HttpClientModule,
        NsCoreModule,
        NsDropdownModule,
        NsIconsModule.forRoot( [ accessible ] )
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
