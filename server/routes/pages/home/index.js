module.exports = app => handleRouteRequest( app );

const route = 'home';

function handleRouteRequest( app ) {
    app.get( '/', async ( req, res, next ) => {
        try {
            const data = {
                ...res.locals,
                page_title: 'Meriton',
                bodyClass: 'home'
            };
            
            res.locals = data;
            next();
        }
        catch ( e ) {
            res.status( e.status || 500 );
            res.render( 'error', {
                message: e.message,
                error: {}
            } );
        }
    } );
}