import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsImageUploadComponent } from './components/image-upload.component';
import { NsIconModule } from '../icon/icon.module';
import { NsImageUrlPipe } from './pipes/image-url.pipe';
import { NsFormsModule } from '../form/forms.module';


@NgModule( {
    imports: [
        CommonModule,
        NsIconModule,
        NsFormsModule
    ],
    declarations: [ NsImageUploadComponent, NsImageUrlPipe ],
    exports: [ NsImageUploadComponent ]
} )
export class NsImageUploadModule
{

}
