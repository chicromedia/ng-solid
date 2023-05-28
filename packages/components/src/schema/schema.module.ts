import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsSchemaMarkupComponent } from './schema.component';


@NgModule( {
    imports: [ CommonModule ],
    declarations: [ NsSchemaMarkupComponent ],
    exports: [ NsSchemaMarkupComponent ]
} )
export class NsSchemaMarkupModule
{
}
