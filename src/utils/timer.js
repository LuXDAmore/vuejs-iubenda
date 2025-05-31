export const timer = ( milliseconds = 1000 ) => new Promise(
    resolve => {

        setTimeout( resolve, milliseconds || 1000 );

    }
);
