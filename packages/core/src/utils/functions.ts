export const isValidURL = ( url: string ) => {try {return Boolean( new URL( url ) );} catch ( e ) {return false;}};
