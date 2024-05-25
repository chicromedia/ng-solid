export const isValidURL = ( url: string ) => {try {return Boolean( new URL( url ) );} catch ( e ) {return false;}};
export const notEmpty = (value: unknown) => Array.isArray( value ) ? !!value.length : !!value;
export const isEmpty = (value: unknown) => Array.isArray( value ) ? !value.length : !value;
export const betweenRange = ( min: number, max: number)=> Math.floor( Math.random() * (max - min) ) + min;
export const isDateValid = (date: string)=>{try {new Date(date);return true;}catch ( e ) {return false;}};
export function isNullOrUndefined<T>( value: T): value is NonNullable<T> {
    return typeof value === 'undefined' || value === null;
}
