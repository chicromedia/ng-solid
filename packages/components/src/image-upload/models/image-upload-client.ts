import { NsImageUpload } from './image-upload';
import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export const NS_IMAGE_UPLOAD_PROVIDER = new InjectionToken( 'nsImageUpload' );

export interface NsImageUploadClient
{
    upload: ( image: NsImageUpload ) => Observable<NsImageUpload>;

    remove: ( image: NsImageUpload ) => Observable<boolean>;
}
