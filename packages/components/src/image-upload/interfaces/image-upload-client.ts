import { Observable } from 'rxjs';
import { NsImageUpload } from '../models/image-upload';

export interface NsImageUploadClient
{
    upload: ( image: NsImageUpload ) => Observable<NsImageUpload>;
    remove: ( image: NsImageUpload ) => Observable<boolean>;
}
