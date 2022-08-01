import { Pipe, PipeTransform } from '@angular/core';
import { isValidURL } from '@ng-solid/core';
import { NsImageUpload } from '../models/image-upload';

@Pipe( {
    name: 'nsImageUrl'
} )
export class NsImageUrlPipe implements PipeTransform
{

    transform( image: NsImageUpload ): string
    {
        if ( image && image.data )
        {
            switch ( true )
            {
                case isValidURL( image.data ) || /data:/.test( image.data ) :
                    return image.data;
                default:
                    return `data:${ image.mimeType };base64,${ image.data }`;
            }
        }
    }

}
