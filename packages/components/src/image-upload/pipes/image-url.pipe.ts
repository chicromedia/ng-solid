import { Pipe, PipeTransform } from '@angular/core';
import { isValidURL } from '@ng-solid/core';
import { NsImage } from '../models/image-upload';

@Pipe( {
    name: 'nsImageUrl'
} )
export class NsImageUrlPipe implements PipeTransform
{

    transform( image: NsImage ): string
    {
        let url = '';
        if ( image && image.data )
        {
            switch ( true )
            {
                case isValidURL( image.data ) || /data:/.test( image.data ) :
                    url = image.data;
                    break;
                default:
                    url = `data:${ image.type };base64,${ image.data }`;
            }
        }
        return url;
    }

}
