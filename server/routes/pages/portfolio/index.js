const PrismicHelpers = require( '../../../prismic/utils' );
const route = 'portfolio';

module.exports = app => handleRouteRequest( app );

function handleRouteRequest( app ) {
    app.get( `/${route}`, async ( req, res, next ) => {
        try {
            const content = await PrismicHelpers.getSinglePage( req.prismic, 'portfolio_landing_page' );

            const data = {
                ...res.locals,
                ...content
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