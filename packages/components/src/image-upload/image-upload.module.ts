import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NsImageUploadComponent } from './image-upload.component';
import { NsImageUrlPipe } from './pipes/image-url.pipe';
import { NsFormsModule } from '../form/forms.module';
import { NsIconsModule } from '@ng-solid/icons';
import { NsImageUpload } from './models/image-upload';
import { Observable } from 'rxjs';



@NgModule( {
    imports: [
        CommonModule,
        NsFormsModule,
        NsIconsModule
    ],
    declarations: [ NsImageUploadComponent, NsImageUrlPipe ],
    exports: [ NsImageUploadComponent ]
} )
export class NsImageUploadModule
{

}
