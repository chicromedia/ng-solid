import { NsImageUrlPipe } from './image-url.pipe';

describe( 'ImageUrlPipe', () =>
{
    it( 'create an instance', () =>
    {
        const pipe = new NsImageUrlPipe();
        expect( pipe ).toBeTruthy();
    } );
} );
