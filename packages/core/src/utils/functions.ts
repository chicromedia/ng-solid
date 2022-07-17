export const isValidURL = ( url: string ) => {try {return Boolean( new URL( url ) );} catch ( e ) {return false;}};
export const notEmpty = value => Array.isArray( value ) ? !!value.length : !!value;
export const isEmpty = value => Array.isArray( value ) ? !value.length : !value;
export const betweenRange = ( min, max)=> Math.floor( Math.random() * (max - min) ) + min;
