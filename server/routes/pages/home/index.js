const PrismicHelpers = require( '../../../prismic/utils' );
const route = 'home';

module.exports = app => handleRouteRequest( app );

function handleRouteRequest( app ) {
    app.get( '/', async ( req, res, next ) => {
        try {
            const content = await PrismicHelpers.getSinglePage( req.prismic, 'home_page' );

            const { grid_background_colors } = content;

            const color1 = grid_background_colors[Math.floor( Math.random() * ( grid_background_colors.length - 1 ) )].color;
            const color2 = grid_background_colors[Math.floor( Math.random() * ( grid_background_colors.length - 1 ) )].color;
            const color3 = grid_background_colors[Math.floor( Math.random() * ( grid_background_colors.length - 1 ) )].color;
            const color4 = grid_background_colors[Math.floor( Math.random() * ( grid_background_colors.length - 1 ) )].color;
            const color5 = grid_background_colors[Math.floor( Math.random() * ( grid_background_colors.length - 1 ) )].color;

            const data = {
                ...res.locals,
                bodyClass: 'home',
                ...content,
                color1,
                color2,
                color3,
                color4,
                color5
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