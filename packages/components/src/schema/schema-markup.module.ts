import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsSchemaComponent } from './components/schema.component';


@NgModule( {
    imports: [ CommonModule ],
    declarations: [ NsSchemaComponent ],
    exports: [ NsSchemaComponent ]
} )
export class NsSchemaMarkupModule
{
}
