import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NsToastModule } from '@ng-solid/components';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule( {
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NsToastModule
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
