import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NsFormsModule } from '@ng-solid/components';
import { FormsModule } from '@angular/forms';

@Component( {
    standalone: true,
    imports: [ RouterModule, NsFormsModule, FormsModule ],
    selector: 'ns-root',
    template: `<h1>Welcome demo</h1>`,
    styles: ``,
} )
export class AppComponent
{

}
