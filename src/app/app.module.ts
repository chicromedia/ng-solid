import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NsFormsModule } from '@ng-solid/components';

@NgModule( {
    imports: [
        BrowserModule,
        HttpClientModule,
        NsFormsModule
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
