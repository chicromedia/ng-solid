import { Observable } from 'rxjs';
import { NsImage, NsImageCreate } from '../models/image-upload';

export interface NsImageUploadClient<TIdentify = unknown>
{
    upload: ( image: NsImageCreate ) => Observable<NsImage<TIdentify>>;
    remove: ( image: NsImage<TIdentify> ) => Observable<boolean>;
}
