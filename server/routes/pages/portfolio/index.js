module.exports = app => handleRouteRequest( app );

const route = 'portfolio';

function handleRouteRequest( app ) {
    app.get( `/${route}`, async ( req, res, next ) => {
        try {
            const data = {
                ...res.locals,
                page_title: 'Meriton Portfolio'
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